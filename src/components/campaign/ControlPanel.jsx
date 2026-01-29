import React from 'react'
import { BoxTopLeftBottomRight } from '../BaseBox'
import Button from '../Button'
import BaseCard from '../BaseCard'

export default function ControlPanel() {
    return (
        <BaseCard>
            <div className='flex flex-row gap-5 items-center justify-around'>
                <span className='font-oxanium font-bold text-xl'>Control panel</span>
                <div className='flex flex-row gap-5 font-sora'>
                <Button className='bg-[#8E0B0B] px-8'>OFF</Button>
                <Button className='px-8'>ON</Button>
                </div>
            </div>
        </BaseCard>
    )
}
