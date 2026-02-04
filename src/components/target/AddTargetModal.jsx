import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import Button from '../Button'
import Text from '../Text'
import Toggle from '../Toggle'

export default function AddTargetModal({
    isOpen,
    onClose,
    onAdd,
    onUpdate,
    onDelete,
    initialData
}) {
    console.log("Initial Data:", initialData)
    const [formData, setFormData] = useState({
        name: '',
        imsi: ''
    })

    const [alertStatus, setAlertStatus] = useState(true)
    const [targetStatus, setTargetStatus] = useState(true)

    useEffect(() => {
        if (initialData && isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: initialData.name || '',
                imsi: initialData.imsi || ''
            })

            setAlertStatus(initialData.alert_status == 'Active')
            setTargetStatus(initialData.target_status == 'Active')
        }

        if (!isOpen) {
            setFormData({ name: '', imsi: '' })
            setAlertStatus(true)
            setTargetStatus(true)
        }
    }, [initialData, isOpen])

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            ...formData,
            alert_status: alertStatus ? 'Active' : 'Inactive',
            target_status: targetStatus ? 'Active' : 'Inactive'
        }

        if (initialData) {
            onUpdate?.({ ...initialData, ...payload })
        } else {
            onAdd?.(payload)
        }

        onClose()
    }

    const isUpdate = Boolean(initialData)

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isUpdate ? 'Update Target' : 'Add Target'}
            width="max-w-lg"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    label="Name"
                    placeholder="Type Name"
                    value={formData.name}
                    onChange={(val) => handleChange('name', val)}
                />

                <Input
                    label="IMSI"
                    placeholder="Type IMSI Number"
                    value={formData.imsi}
                    onChange={(val) => handleChange('imsi', val)}
                />

                <div className="flex flex-row gap-5">
                    <Toggle
                        value={targetStatus}
                        onChange={setTargetStatus}
                        label="Target Status"
                    />

                    <Toggle
                        value={alertStatus}
                        onChange={setAlertStatus}
                        label="Alert Status"
                    />
                </div>

                <div className="flex justify-center text-center gap-3 my-5 w-full">
                    {isUpdate && (
                        <Button
                            className="w-full bg-[#8E0B0B] flex items-center justify-center"
                            type="button"
                            onClick={() => {
                                onDelete?.(initialData)
                                onClose()
                            }}
                        >
                            <Text className="uppercase">Delete</Text>
                        </Button>
                    )}

                    <Button
                        className="w-full flex items-center justify-center"
                        type="submit"
                    >
                        <Text className="uppercase">
                            {isUpdate ? 'Update' : 'Save'}
                        </Text>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
