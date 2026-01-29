import React from 'react'
import { BoxTopLeftBottomRight } from '../BaseBox'
import BaseCard from '../BaseCard'

export default function CardStats({ icon, title, value }) {
    return (
        <BaseCard>
            <div className="flex flex-row gap-5 items-center w-full">
                <img src={icon} alt="" />
                <div className="flex flex-col">
                    <span className="text-sm text-[#05F258] font-oxanium">{title}</span>
                    <span className="text-2xl font-chakra font-bold">{value}</span>
                </div>
            </div>
        </BaseCard>
    )
}
