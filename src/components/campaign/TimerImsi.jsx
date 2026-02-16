import React, { useEffect } from 'react'
import { MdTimer } from 'react-icons/md'
import { BoxTopLeftBottomRight } from '../BaseBox'
import BaseCard from '../BaseCard'
import { useCampaign } from '../../context/CampaignContext'

export default function TimerImsi() {
    const { remainingTime, setRemainingTime, imsiData, isRunning, setIsRunning } = useCampaign();

    useEffect(() => {
        if (!isRunning) return;
        const storedStartTime = localStorage.getItem('campaignStartTime');
        const storedDuration = localStorage.getItem('campaignDuration');

        if (!storedStartTime || !storedDuration) return;

        const startTime = parseInt(storedStartTime, 10);
        const duration = parseInt(storedDuration, 10);
        const endTime = startTime + duration;

        const updateTimer = () => {
            const now = Math.floor(Date.now() / 1000);
            const timeLeft = Math.max(0, endTime - now);

            setRemainingTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(interval);
                setIsRunning(false);
                localStorage.removeItem('campaignType');
                localStorage.removeItem('campaignMinutes');
                localStorage.removeItem('campaignSeconds');
                // stopCampaign();
            }
        };

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [isRunning, setRemainingTime, setIsRunning]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <BaseCard>
            <div className="flex flex-row items-center w-full justify-around">
                <div className='flex flex-col items-center'>
                    <MdTimer size={28} />
                    <span className='text-3xl font-chakra'>
                        {formatTime(remainingTime)}
                    </span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-oxanium'>Imsi Captured</span>
                    <span className='text-3xl font-chakra font-extrabold'>
                        {imsiData.length}
                    </span>
                </div>
            </div>
        </BaseCard>
    )
}
