import React, { useState, useEffect } from 'react'
import Input from '../Input'
import Button from '../Button'
import BaseCard from '../BaseCard'
import Radio from '../Radio'
import Text from '../Text'
import { useCampaign } from '../../context/CampaignContext'
import { API_ENDPOINTS } from '../../config/apiConfig'

export default function FormCampaign() {
    const [campaignName, setCampaignName] = useState('')
    const [imsi, setImsi] = useState('')
    const [type, setType] = useState(() => localStorage.getItem('campaignType') || "all")

    const [durationMinutes, setDurationMinutes] = useState(() => localStorage.getItem('campaignMinutes') || '20')
    const [durationSeconds, setDurationSeconds] = useState(() => localStorage.getItem('campaignSeconds') || '0')

    const [fetchingTargets, setFetchingTargets] = useState(false)

    const { startCampaign, stopCampaign, loading, error, isRunning, setTargetNameMap } = useCampaign()

    useEffect(() => {
        const fetchTargets = async () => {
            setFetchingTargets(true)
            try {
                const response = await fetch(API_ENDPOINTS.TARGET.LIST)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()

                if (result.status === 'success' && result.data && result.data.length > 0) {
                    const nameMap = result.data.reduce((acc, target) => {
                        acc[target.imsi] = target.name
                        return acc
                    }, {})
                    setTargetNameMap(nameMap)

                    const activeTargets = result.data.filter(t => t.target_status === 'Active')
                    const imsiList = activeTargets.map(target => target.imsi).join(' ')
                    setImsi(imsiList)
                }
            } catch (err) {
                console.error('Error fetching targets:', err)
            } finally {
                setFetchingTargets(false)
            }
        }

        fetchTargets()
    }, [setTargetNameMap])



    useEffect(() => {
        localStorage.setItem('campaignType', type)
    }, [type])

    useEffect(() => {
        localStorage.setItem('campaignMinutes', durationMinutes)
        localStorage.setItem('campaignSeconds', durationSeconds)
    }, [durationMinutes, durationSeconds])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isRunning) {
            try {
                await stopCampaign()
                setType('all')
                setDurationMinutes('20')
                setDurationSeconds('0')
                localStorage.removeItem('campaignType')
                localStorage.removeItem('campaignMinutes')
                localStorage.removeItem('campaignSeconds')
            } catch (err) {
                alert(`Failed to stop campaign: ${err.message}`)
            }
            return
        }

        if (!campaignName.trim()) {
            alert('Please enter a campaign name')
            return
        }

        if (!imsi.trim()) {
            alert('No active targets available. Please add targets first.')
            return
        }

        try {
            const minutes = parseInt(durationMinutes || '0', 10)
            const seconds = parseInt(durationSeconds || '0', 10)

            const formattedDuration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

            await startCampaign({
                name: campaignName,
                imsi: imsi,
                mode: type,
                duration: formattedDuration
            })

            setCampaignName('')
        } catch (err) {
            alert(`Failed to start campaign: ${err.message}`)
        }
    }

    const handleMinutesChange = (e) => {
        let value = e.target.value

        value = value.replace(/\D/g, '')
        value = value.replace(/^0+(?=\d)/, '')

        if (value === '') {
            setDurationMinutes('')
            return
        }

        const num = Math.min(60, Math.max(0, parseInt(value, 10)))
        setDurationMinutes(String(num))
    }

    const handleSecondsChange = (e) => {
        let value = e.target.value

        value = value.replace(/\D/g, '')
        value = value.replace(/^0+(?=\d)/, '')

        if (value === '') {
            setDurationSeconds('')
            return
        }

        const num = Math.min(59, Math.max(0, parseInt(value, 10)))
        setDurationSeconds(String(num))
    }

    const totalDuration =
        (parseInt(durationMinutes || '0', 10) * 60) +
        parseInt(durationSeconds || '0', 10)

    return (
        <BaseCard.Form>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <h3 className='text-xl font-bold font-oxanium'>Start Campaign</h3>

                <Input
                    label={"Campaign Name"}
                    value={campaignName}
                    onChange={setCampaignName}
                    placeholder="Enter campaign name"
                    disabled={loading || fetchingTargets || isRunning}
                />

                <div className='flex flex-row gap-2 font-oxanium'>
                    <Radio
                        name="blacklist"
                        value="blacklist"
                        label="Blacklist"
                        checked={type === "blacklist"}
                        onChange={() => setType("blacklist")}
                        className='border border-[#00F255] px-3 py-1'
                        disabled={loading || fetchingTargets || isRunning}
                    />
                    <Radio
                        name="whitelist"
                        value="whitelist"
                        label="Whitelist"
                        checked={type === "whitelist"}
                        onChange={() => setType("whitelist")}
                        className='border border-[#00F255] px-3 py-2'
                        disabled={loading || fetchingTargets || isRunning}
                    />
                    <Radio
                        name="all"
                        value="all"
                        label="All"
                        checked={type === "all"}
                        onChange={() => setType("all")}
                        className='border border-[#00F255] px-3 py-2'
                        disabled={loading || fetchingTargets || isRunning}
                    />

                    <div className='border border-[#00F255] px-3 py-1 flex items-center gap-2'>
                        <Text>Duration</Text>
                        <div className='flex items-center gap-1'>
                            <input
                                type='text'
                                inputMode='numeric'
                                value={durationMinutes}
                                onFocus={(e) => e.target.select()}
                                onChange={handleMinutesChange}
                                disabled={loading || fetchingTargets || isRunning}
                                className='w-8 bg-transparent border-none text-center focus:outline-none text-xs'
                            />
                            <Text>:</Text>
                            <input
                                type='text'
                                inputMode='numeric'
                                value={durationSeconds}
                                onFocus={(e) => e.target.select()}
                                onChange={handleSecondsChange}
                                disabled={loading || fetchingTargets || isRunning}
                                className='w-8 bg-transparent border-none text-center focus:outline-none text-xs'
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}

                <Button
                    type="submit"
                    className={`w-fit px-10 font-oxanium ${isRunning ? 'bg-[#8E0B0B] hover:bg-[#6E0909]' : ''}`}
                    disabled={
                        loading ||
                        fetchingTargets ||
                        (!imsi && !isRunning) ||
                        (!campaignName.trim() && !isRunning) ||
                        (totalDuration < 120 && !isRunning)
                    }
                >
                    {fetchingTargets
                        ? 'LOADING TARGETS...'
                        : loading
                            ? (isRunning ? 'STOPPING...' : 'STARTING...')
                            : isRunning
                                ? 'STOP'
                                : 'START'}
                </Button>
            </form>
        </BaseCard.Form>
    )
}
