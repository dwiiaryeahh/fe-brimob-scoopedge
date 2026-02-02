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
                    <div className='flex flex-row gap-3 justify-between'>
                        <div className='grid grid-cols-[50px_1fr] gap-y-1 text-left'>
                            <Text className='opacity-70'>TYPE</Text>
                            <Text>: {channel.mode}</Text>

                            <Text className='opacity-70'>ARFCN</Text>
                            <Text>: {channel.arfcn}</Text>

                            <Text className='opacity-70'>BAND</Text>
                            <Text>: {channel.band}</Text>

                            <Text className='opacity-70'>RX / TX</Text>
                            <Text>: {channel.rx} / {channel.tx}</Text>
                        </div>
                        <div className='flex flex-col justify-between gap-1'>
                            <div className='flex flex-row gap-2'>
                                {channel.temp > 70
                                    ? <FaTemperatureHigh color='#D91313' />
                                    : <FaTemperatureLow color='#80FF00' />
                                }
                                <Text size='12px'>  {channel.temp}°C</Text>
                            </div>
                            <div className='border rounded-sm p-2 border-[#3F9861] w-12.5 h-10.25 flex items-center'>
                                <img src={channel.img}/>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCard.All>
        </div>
    )
}
