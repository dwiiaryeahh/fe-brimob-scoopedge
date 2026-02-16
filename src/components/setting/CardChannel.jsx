import React from 'react'
import BaseCard from '../BaseCard'
import Text from '../Text'
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa'
import sideLeft from '../../assets/side_left_channel.svg'
import sideRight from '../../assets/side_right_channel.svg'
import bgLabel from '../../assets/bg_label.svg'

export default function CardChannel({ channel }) {
    return (
        <div className='relative w-full font-oxanium'>
            <img src={sideLeft} alt="" className='absolute top-5 -left-px' />
            <img src={sideRight} alt="" className='absolute bottom-5 -right-px' />
            <BaseCard.All border='#3F9861' bg='#052411' borderW={3} innerShadow='0 0 20px 1px rgba(165, 183, 201, 0.8)'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row justify-between'>
                        <Text size='16px'>CH - {channel.ch}</Text>
                        <div className='relative flex items-center justify-center'>
                            <img src={bgLabel} className='w-full h-full' />
                            <Text
                                size='10px'
                                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
                            >
                                {channel.status}
                            </Text>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 justify-between flex-nowrap'>
                        <div className='gap-1 flex flex-col'>
                            <div className='grid grid-cols-[42px_1fr] gap-y-1 text-left'>
                                <Text className='opacity-70'>TYPE</Text>
                                <Text className='text-nowrap'>: {channel.mode}</Text>

                                <Text className='opacity-70'>ARFCN</Text>
                                <Text>: {channel.arfcn}</Text>

                                <Text className='opacity-70'>BAND</Text>
                                <Text>: {channel.band}</Text>

                            </div>
                            <div className='grid grid-cols-[20px_1fr] gap-y-1 text-left'>
                                <Text className='opacity-70'>UL</Text>
                                <Text className='text-nowrap'>: {channel.ul}</Text>

                                <Text className='opacity-70'>DL</Text>
                                <Text className='text-nowrap'>: {channel.dl}</Text>
                            </div>
                        </div>

                        <div className='flex flex-col justify-around items-end gap-1'>
                            <div className='flex flex-row gap-2'>
                                {channel.temp > 70
                                    ? <FaTemperatureHigh color='#D91313' />
                                    : <FaTemperatureLow color='#80FF00' />
                                }
                                <Text size='12px'>  {channel.temp}°C</Text>
                            </div>
                            <div>

                                {channel.img === '-' ? (
                                    <Text size='16px'>-</Text>
                                ) : Array.isArray(channel.img) ? (
                                    <div className='flex flex-row w-full gap-1'>
                                        {
                                            channel.img.map((src, i) => (
                                                <div className='border rounded-sm p-1 border-[#3F9861] w-10 h-10.25 flex flex-row items-center justify-center gap-1 overflow-hidden'>
                                                    <img key={i} src={src} alt="provider" className='h-full object-contain w-full' />
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className='border rounded-sm p-1 border-[#3F9861] w-12.5 h-10.25 flex flex-row items-center justify-center gap-1 overflow-hidden'>
                                        <img src={channel.img} alt="provider" className='w-full h-full object-contain' />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCard.All>
        </div>
    )
}
