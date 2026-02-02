import React, { useState } from 'react'
import { BoxAllSide } from '../BaseBox'
import Table from '../table/Table'
import AddTargetModal from './AddTargetModal'
import ImportTargetModal from './ImportTargetModal'
import Button from '../Button'

const ButtonCustom = ({ onClick, label }) => {
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
                {label}
            </span>
        </BoxAllSide>
    )
}

export default function ListTarget() {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalImportOpen, setIsModalImportOpen] = useState(false)
    const [selectedTarget, setSelectedTarget] = useState(null)
    console.log('selectedTarget', selectedTarget)

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
                        setIsModalAddOpen(true)
                    }}
                >
                    {row.name}
                </span>
            )
        },
        { key: "imsi", label: "Imsi" },
        { key: "date", label: "Last Update" },
        { key: "alertStatus", label: "Alert Status" },
        { key: "targetStatus", label: "Target Status" },
    ]

    const data = [
        { no: "1", name: "Budi", imsi: "1234567890", date: "2023-01-01", count: 5, targetStatus: "Active", alertStatus: "Active", },
        { no: "2", name: "Siti", imsi: "0987654321", date: "2023-01-02", count: 3, targetStatus: "Inactive", alertStatus: "Inactive", },
        { no: "3", name: "Siti", imsi: "0987654321", date: "2023-01-02", count: 3, targetStatus: "Inactive", alertStatus: "Inactive", },
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

    const handleImportTarget = async (formData, file) => {
        try {
            // Here you would typically send the file to your backend API
            // Example:
            // const response = await fetch('/api/targets/import', {
            //     method: 'POST',
            //     body: formData
            // })
            // const result = await response.json()

            console.log("Importing file:", file.name)
            console.log("FormData:", formData)

            // For now, just log the file info
            // You can add your API call here
            alert(`File "${file.name}" imported successfully!`)
        } catch (error) {
            console.error("Import error:", error)
            throw new Error("Failed to import file. Please try again.")
        }
    }

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div className='flex justify-between items-center'>
                <h3 className="text-xl font-bold text-white/90">List Target</h3>
                <div className='flex flex-row gap-3'>
                    <ButtonCustom onClick={() => {
                        setSelectedTarget(null)
                        setIsModalImportOpen(true)
                    }} label={"Import"} />

                    <ButtonCustom onClick={() => {
                        setSelectedTarget(null)
                        setIsModalAddOpen(true)
                    }} label={"Add New"} />
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => {
                        setSelectedTarget(row)
                        setIsModalAddOpen(true)
                    }}
                />
            </div>

            <AddTargetModal
                isOpen={isModalAddOpen}
                onClose={() => setIsModalAddOpen(false)}
                onAdd={handleAddTarget}
                onUpdate={handleUpdateTarget}
                onDelete={handleDeleteTarget}
                initialData={selectedTarget}
            />

            <ImportTargetModal
                isOpen={isModalImportOpen}
                onClose={() => setIsModalImportOpen(false)}
                onImport={handleImportTarget}
            />
        </div>
    )
}