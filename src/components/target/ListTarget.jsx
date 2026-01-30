import React, { useState } from 'react'
import { BoxAllSide } from '../BaseBox'
import Table from '../table/Table'
import AddTargetModal from './AddTargetModal'
import Button from '../Button'

const ButtonAddNew = ({ onClick }) => {
    return (
        <BoxAllSide
            cut={14}
            borderW={2}
            borderColor="#00FF62"
            bg="rgba(0, 255, 98, 0.1)"
            contentPadding={8}
            className="w-fit! cursor-pointer hover:brightness-125 transition-all"
            onClick={onClick}
        >
            <span className="text-white font-semibold text-sm select-none mx-5 my-10 font-oxanium">
                Add New
            </span>
        </BoxAllSide>
    )
}

export default function ListTarget() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTarget, setSelectedTarget] = useState(null)

    const columns = [
        { key: "no", label: "No" },
        {
            key: "name", label: "Name",
            render: (row) => (
                <span
                    className="cursor-pointer underline hover:brightness-125 transition-all text-[#2AF170]"
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedTarget(row)
                        setIsModalOpen(true)
                    }}
                >
                    {row.name}
                </span>
            )
        },
        { key: "imsi", label: "Imsi" },
        { key: "date", label: "Last Update" },
        { key: "count", label: "Count" },
        { key: "status", label: "Status" },
    ]

    const data = [
        { no: "1", name: "Budi", imsi: "1234567890", date: "2023-01-01", count: 5, status: "Active" },
        { no: "2", name: "Siti", imsi: "0987654321", date: "2023-01-02", count: 3, status: "Inactive" },
        { no: "3", name: "Siti", imsi: "0987654321", date: "2023-01-02", count: 3, status: "Inactive" },
    ]

    const handleAddTarget = (newTarget) => {
        console.log("New Target added:", newTarget)
    }

    const handleUpdateTarget = (updatedTarget) => {
        console.log("Target updated:", updatedTarget)
    }

    const handleDeleteTarget = (targetToDelete) => {
        console.log("Target deleted:", targetToDelete)
    }

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div className='flex justify-between items-center'>
                <h3 className="text-xl font-bold text-white/90">List Target</h3>
                <ButtonAddNew onClick={() => {
                    setSelectedTarget(null)
                    setIsModalOpen(true)
                }} />
            </div>
            <div>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => {
                        setSelectedTarget(row)
                        setIsModalOpen(true)
                    }}
                />
            </div>

            <AddTargetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddTarget}
                onUpdate={handleUpdateTarget}
                onDelete={handleDeleteTarget}
                initialData={selectedTarget}
            />
        </div>
    )
}