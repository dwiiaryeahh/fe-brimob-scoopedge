import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import Button from '../Button'
import Text from '../Text'
import Toggle from '../Toggle'
export default function AddTargetModal({ isOpen, onClose, onAdd, onUpdate, onDelete, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        imsi: '',
        msisdn: '',
        description: ''
    })

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                name: initialData.name || '',
                imsi: initialData.imsi || '',
                msisdn: initialData.msisdn || '',
                description: initialData.description || ''
            })
            // eslint-disable-next-line react-hooks/immutability
            setIsActive(initialData.active ?? true)
        } else if (!isOpen) {
            setFormData({ name: '', imsi: '', msisdn: '', description: '' })
            setIsActive(true)
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
        if (initialData) {
            onUpdate?.({ ...initialData, ...formData })
        } else {
            onAdd?.(formData)
        }
        onClose()
    }

    const isUpdate = !!initialData
    const [isActive, setIsActive] = useState(true)


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isUpdate ? "Update Target" : "Add Target"}
            width="max-w-lg"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                <Toggle
                    value={isActive}
                    status={isActive ? 'active' : 'deactive'}
                    onChange={setIsActive}
                />

                <div className="flex justify-center text-center gap-3 mb-5  w-full">
                    {isUpdate && (
                        <Button
                            className="w-full bg-[#8E0B0B] flex items-center justify-center"
                            type="button"
                            onClick={() => {
                                onDelete?.(initialData)
                                onClose()
                            }}
                        >
                            <Text className='uppercase'>
                                Delete
                            </Text>
                        </Button>
                    )}



                    <Button
                        className="w-full flex items-center justify-center"
                        type="submit"
                    >
                        <Text className='uppercase'>
                            {isUpdate ? 'Update' : 'Save'}
                        </Text>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
