import { useEffect, useState, useMemo } from 'react'
import Modal from '../Modal'
import Text from '../Text';
import BaseCard from '../BaseCard';
import ListDetailReport from './ListDetailReport';
import Input from '../Input';
import { FaRegClock } from 'react-icons/fa';
import { BsFiletypePdf, BsFiletypeXls } from 'react-icons/bs';
import { useReportApi } from '../../hooks';
import { formatDateTime } from '../../utils/formatDateTime'

const Item = ({ children }) => {
    return (
        <div className='flex justify-between flex-row gap-3 items-center'>
            {children}
        </div>
    )
}

export default function ReportDetailModal({ title, isOpen, onClose, reportId }) {
    const [searchQuery, setSearchQuery] = useState('')
    const {
        loading,
        reportDetail,
        getReportDetail,
        getExportUrl
    } = useReportApi()

    useEffect(() => {
        if (isOpen && reportId) {
            getReportDetail(reportId)
        }
    }, [isOpen, reportId, getReportDetail])

    const handleExport = (type) => {
        if (!reportId) return
        const url = getExportUrl(reportId, type)
        window.open(url, '_blank')
    }

    const filteredCrawlings = useMemo(() => {
        const crawlings = reportDetail?.crawlings || []
        if (!searchQuery) return crawlings

        const query = searchQuery.toLowerCase()
        return crawlings.filter(item =>
            (item.imsi && item.imsi.toLowerCase().includes(query)) ||
            (item.alert_name && item.alert_name.toLowerCase().includes(query)) ||
            (item.alert_status && item.alert_status.toLowerCase().includes(query)) || 
            (item.alert_status && item.alert_status.toLowerCase().includes(query))
        )
    }, [reportDetail, searchQuery])

    if (!isOpen) return null;

    const data = reportDetail || {}

    const calculateDuration = (start, stop) => {
        if (!start || !stop) return "00:00:00";

        const diffMs = new Date(stop) - new Date(start);
        if (diffMs < 0) return "00:00:00";

        let totalSeconds = Math.floor(diffMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map(v => String(v).padStart(2, '0'))
            .join(':');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            type="other"
            width="max-w-7xl"
        >
            <div className='flex flex-row w-full gap-10'>
                <div className="flex flex-col flex-1 gap-5 w-full">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Text>Loading details...</Text>
                        </div>
                    ) : (
                        <>
                            <Item>
                                <Text size='16px'>Status</Text>
                                <div className={`${data.status === 'completed' || data.status === 'started' ? 'bg-[#0C9E44]' : 'bg-[#616B81]'} px-7 py-2 w-38.5 text-center text-white capitalize`}>
                                    {data.status || '-'}
                                </div>
                            </Item>
                            <Item>
                                <Text size='16px'>Mode</Text>
                                <div className='bg-[#616B81] px-7 py-2 w-38.5 text-center text-white capitalize'>
                                    {data.mode || '-'}
                                </div>
                            </Item>
                            <div className='w-full bg-[#0F5028] text-center py-2 flex justify-center items-center gap-3' style={{
                                border: "1px solid",
                                borderImageSource: "linear-gradient(120.95deg, #00FF62 1.99%, #008A35 34.1%, #005B23 68.89%)",
                                borderImageSlice: 1
                            }}>
                                <FaRegClock size={30} className="text-white" />
                                <Text family='chakra' size='32px' color="white">
                                    {calculateDuration(data.start_scan, data.stop_scan)}
                                </Text>
                            </div>
                            <div className='flex flex-row max-w-full justify-between items-center gap-5'>
                                <Item>
                                    <Text size='14px'>Start</Text>
                                    <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3 min-w-30'>
                                        <Text align='center'>
                                            {formatDateTime(data.start_scan) || '-'}
                                        </Text>
                                    </div>
                                </Item>
                                <Item>
                                    <Text size='14px'>Stop</Text>
                                    <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3 min-w-30'>
                                        <Text align='center'>
                                            {data.stop_scan ? formatDateTime(data.stop_scan) : '-'}
                                        </Text>
                                    </div>
                                </Item>
                            </div>
                            <Item>
                                <Text size='14px'>IMSI Detected</Text>
                                <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3 w-38.5'>
                                    <Text align='right'>
                                        {data.crawlings?.length || '0'}
                                    </Text>
                                </div>
                            </Item>
                            <Item>
                                <Text size='14px'>Alert</Text>
                                <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3 w-38.5'>
                                    <Text align='right'>
                                        0
                                    </Text>
                                </div>
                            </Item>
                        </>
                    )}
                </div>
                <div className='flex-3'>
                    <BaseCard.All bg='#0B2816'>
                        <div className='gap-3 flex flex-col'>
                            <div className='flex flex-row justify-between gap-3'>
                                <div className='relative flex-1 max-w-md'>
                                    <Input
                                        className="rounded-sm bg-linear-to-t from-[#043516] to-[#0F5028] w-full"
                                        placeholder="Search by IMSI or provider..."
                                        value={searchQuery}
                                        onChange={(value) => setSearchQuery(value)}
                                    />
                                </div>
                                <div className='inline-flex gap-5'>
                                    <button
                                        onClick={() => handleExport('excel')}
                                        className='flex gap-2 items-center cursor-pointer hover:brightness-125 transition-all'
                                        disabled={!reportId}
                                    >
                                        <BsFiletypeXls color='#CA7A02' size={20} />
                                        <Text>EXPORT XLS</Text>
                                    </button>
                                    <button
                                        onClick={() => handleExport('pdf')}
                                        className='flex gap-2 items-center cursor-pointer hover:brightness-125 transition-all'
                                        disabled={!reportId}
                                    >
                                        <BsFiletypePdf color='#01D754' size={20} />
                                        <Text>EXPORT PDF</Text>
                                    </button>
                                </div>
                            </div>
                            <ListDetailReport data={filteredCrawlings} loading={loading} />
                        </div>
                    </BaseCard.All>
                </div>
            </div>
        </Modal>
    )
}

