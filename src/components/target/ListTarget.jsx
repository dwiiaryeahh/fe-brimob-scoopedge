import React from 'react'
import { BoxAllSide } from '../BaseBox'
import Table from '../table/Table'

const ButtonAddNew = () => {
    return (
        <BoxAllSide
            cut={14}
            borderW={2}
            borderColor="#00FF62"
            bg="rgba(0, 255, 98, 0.1)"
            contentPadding={8}
            className="w-fit! cursor-pointer hover:brightness-125 transition-all"
        >
            <span className="text-white font-semibold text-sm select-none mx-5 my-10 font-oxanium">
                Add New
            </span>
        </BoxAllSide>
    )
}

export default function ListTarget() {
    const columns = [
        { key: "no", label: "No" },
        { key: "name", label: "Name" },
        { key: "imsi", label: "Imsi"},
        { key: "date", label: "Last Update"},
        { key: "count", label: "Count"},
        { key: "status", label: "Status"},
    ]

    const data = [
        { no:"1", name: "Budi", imsi: "1234567890", date: "2023-01-01", count: 5, status: "Active" },
        { no:"2", name: "Siti", imsi: "0987654321", date: "2023-01-02", count: 3, status: "Inactive" },
        { no:"2", name: "Siti", imsi: "0987654321", date: "2023-01-02", count: 3, status: "Inactive" },
        
    ]

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div className='flex justify-between items-center'>
                <h3 className="text-xl font-bold text-white/90">List Target</h3>
                <ButtonAddNew />
            </div>
            <div>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                />
            </div>
        </div>
    )
}