import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import Button from '../Button'
import Text from '../Text'
import Toggle from '../Toggle'

export default function AddCampaignTargetModal({
    isOpen,
    onClose,
    onAdd,
    imsi,
    campaignId
}) {
    const [formData, setFormData] = useState({
        name: '',
        imsi: imsi || ''
    })

    const [alertStatus, setAlertStatus] = useState(true)
    const [targetStatus, setTargetStatus] = useState(true)

    useEffect(() => {
        if (isOpen && imsi) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: '',
                imsi: imsi
            })
            setAlertStatus(true)
            setTargetStatus(true)
        }

        if (!isOpen) {
            setFormData({ name: '', imsi: '' })
            setAlertStatus(true)
            setTargetStatus(true)
        }
    }, [imsi, isOpen])

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
            name: formData.name.trim() || 'unknown',
            alert_status: alertStatus ? 'Active' : 'Inactive',
            target_status: targetStatus ? 'Active' : 'Inactive',
            campaign_id: campaignId
        }

        onAdd?.(payload)
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title='Add Target'
            width="max-w-lg"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                    label="Name"
                    placeholder="Type Name (leave empty for 'unknown')"
                    value={formData.name}
                    onChange={(val) => handleChange('name', val)}
                />

                <Input
                    label="IMSI"
                    placeholder="Type IMSI Number"
                    value={formData.imsi}
                    onChange={(val) => handleChange('imsi', val)}
                    disabled={true}
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
                    <Button
                        className="w-full flex items-center justify-center"
                        type="submit"
                    >
                        <Text className="uppercase">Save</Text>
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
