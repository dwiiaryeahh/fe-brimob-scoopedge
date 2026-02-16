import { useState } from 'react';
import Table from '../table/Table'
import Button from '../Button';
import { columnsCampaign } from '../table/columns/columnsCampaign';
import { useCampaign } from '../../context/CampaignContext';
import { useTargetApi } from '../../hooks/useTargetApi';
import AddCampaignTargetModal from './AddCampaignTargetModal';
import Input from '../Input';

export default function ListCampaign() {
    const { imsiData, setTargetNameMap, targetNameMap, activeCampaign, setTargetAlertMap } = useCampaign();
    const { createTarget } = useTargetApi();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedImsi, setSelectedImsi] = useState(null);

    const handleTargetAction = (row) => {
        setSelectedImsi(row.imsi);
        setIsModalOpen(true);
    };

    const handleAddTarget = async (targetData) => {
        try {
            const result = await createTarget(targetData);

            if (result.status === 'success') {
                console.log('Target created successfully:', result.data);

                setTargetNameMap(prev => ({
                    ...prev,
                    [targetData.imsi]: targetData.name
                }));

                setTargetAlertMap(prev => ({
                    ...prev,
                    [targetData.imsi]: targetData.alert_status
                }));

                alert(`Target added successfully for IMSI: ${targetData.imsi}`);
            }
        } catch (err) {
            console.error('Error creating target:', err);
            alert(`Failed to add target: ${err.message || 'Unknown error'}`);
        }
    };

    const handleSort = (key) => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const columns = columnsCampaign({
        handleTargetAction,
        isTargetExist: (imsi) => !!targetNameMap[imsi],
        onSort: handleSort,
        sortConfig
    });

    const filteredData = imsiData
        .filter((item) => {
            if (!searchQuery) return true;
            return (item.imsi || '').toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (sortConfig.key === 'rssi') {
                const rssiA = parseFloat(a.ulRssi) || -Infinity;
                const rssiB = parseFloat(b.ulRssi) || -Infinity;
                return sortConfig.direction === 'asc' ? rssiA - rssiB : rssiB - rssiA;
            }
            return 0;
        });

    const tableData = filteredData.map((item, index) => ({
        no: (index + 1).toString(),
        imsi: item.imsi || '-',
        date: item.timestamp || '-',
        channel: item.ch || '-',
        count: item.count || '-',
        provider: item.provider || '-',
        target: item.targetName || '-',
        rssi: item.ulRssi || '-',
    }));

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div className='flex flex-row justify-between items-center mt-1.5 mb-1.5'>
                <h3 className="text-xl font-bold text-white/90 w-full">
                    IMSI Total ({imsiData.length})
                </h3>
                <Input
                    className="self-end min-w-3xs max-w-xs"
                    placeholder="Search IMSI"
                    value={searchQuery}
                    onChange={(val) => setSearchQuery(val)}
                />
            </div>
            <div className=''>
                <Table
                    columns={columns}
                    data={tableData}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                />
            </div>

            <AddCampaignTargetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddTarget}
                imsi={selectedImsi}
                campaignId={activeCampaign?.id}
            />
        </div>
    )
}