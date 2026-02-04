import React from 'react'
import { MdTimer } from 'react-icons/md'
import { BoxTopLeftBottomRight } from '../BaseBox'
import BaseCard from '../BaseCard'

export default function TimerImsi() {
    return (
        <BaseCard>
            <div className="flex flex-row items-center w-full justify-around">
                <div className='flex flex-col items-center'>
                    <MdTimer size={28} />
                    <span className='text-3xl font-chakra'>00:00:00</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-oxanium'>Imsi Captured</span>
                    <span className='text-3xl font-chakra font-extrabold'>10000</span>
                </div>
            </div>
        </BaseCard>
    )
}
