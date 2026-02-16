import React, { useState, useEffect } from 'react'
import SettingWrapper from '../../components/setting/SettingWrapper'
import Text from '../../components/Text'
import Button from '../../components/Button'
import ScanningProgress from '../../components/setting/ScanningProgress'
import ListSniffer from '../../components/setting/ListSniffer'
import ScanCompleteModal from '../../components/setting/ScanCompleteModal'
import { FaPlay } from 'react-icons/fa'
import { useSnifferApi } from '../../hooks/useSnifferApi'
import { useSnifferWebSocket } from '../../hooks/useSnifferWebSocket'

export default function SnifferPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    const { startSniffer, loading: apiLoading, error: apiError } = useSnifferApi();

    const {
        sniffingData,
        sniffingCount,
        progressState,
        isCompleted,
        connect,
        disconnect,
        clearData,
        resetCompletion,
    } = useSnifferWebSocket({ autoConnect: false });

    const handleStartScan = async () => {
        try {
            clearData();
            resetCompletion();
            setShowCompleteModal(false);

            connect();

            await startSniffer();

            setIsScanning(true);
        } catch (error) {
            console.error('Failed to start scan:', error);
            disconnect();
        }
    };

    useEffect(() => {
        if (isCompleted && isScanning) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowCompleteModal(true);
            setIsScanning(false);
        }
    }, [isCompleted, isScanning]);

    const handleCloseModal = () => {
        setShowCompleteModal(false);
        resetCompletion();
    };

    return (
        <SettingWrapper title={"Sniffer"}>
            <div className="flex items-center justify-center mt-5">
                <div
                    className='w-3/4 border border-[#174828] p-5 flex flex-col'
                    style={{
                        background: "linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 100.86%)"
                    }}
                >
                    <div className='flex justify-between items-center gap-5'>
                        <Text size='17px'>SNIFFER</Text>
                        <ScanningProgress progress={progressState.progress} />
                        <Button
                            className='whitespace-nowrap'
                            icon={<FaPlay />}
                            onClick={handleStartScan}
                            disabled={apiLoading || isScanning}
                        >
                            {apiLoading ? 'Starting...' : isScanning ? 'Scanning...' : 'Start Scan'}
                        </Button>
                    </div>

                    {/* Show error if API call fails */}
                    {apiError && (
                        <div className="mt-2 p-2 bg-red-900/20 border border-red-500/50 rounded">
                            <Text size='12px' className="text-red-400">
                                Error: {apiError}
                            </Text>
                        </div>
                    )}
                    <div className='flex-1 mt-4 pr-2'>
                        <ListSniffer sniffingData={sniffingData} />
                    </div>

                    <div className='flex justify-between items-center mt-4'>
                        <div className='flex items-center gap-5'>
                            <Text size='14px' family='sora'>Count</Text>
                            <span className='px-10 py-1 font-chakra bg-[#0B2816]'>{sniffingCount}</span>
                        </div>
                        {/* <Button icon={iconApply}>APPLY</Button> */}
                    </div>
                </div>
            </div>

            {/* Scan Complete Modal */}
            <ScanCompleteModal
                isOpen={showCompleteModal}
                onClose={handleCloseModal}
                totalResults={sniffingCount}
            />
        </SettingWrapper>
    )
}
