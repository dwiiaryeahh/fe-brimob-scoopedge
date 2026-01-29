import React, { useState } from 'react'
import SettingWrapper from '../../components/setting/SettingWrapper'
import SliderDistance from '../../components/setting/SliderDistance'
import BaseCard from '../../components/BaseCard'
import Text from '../../components/Text'
import Button from '../../components/Button'
import iconApply from '../../assets/ic_apply.svg'
import iconReset from '../../assets/ic_reset.svg'

export default function DistancePage() {
    const [distance, setDistance] = useState({
        tx: { lte: 70, wcdma: 70, gsm: 70 },
        rx: { lte: 70, wcdma: 70, gsm: 70 },
    })

    const handleChange = (type, tech) => (value) => {
        setDistance(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [tech]: value,
            },
        }))
    }

    return (
        <SettingWrapper title={"Distance Radius"}>
            <div className="flex items-center justify-center min-h-[70vh]">
                <div
                    className='w-3/4 min-h-[50vh] max-h-[60vh] border border-[#174828] p-5 flex flex-col gap-6'
                    style={{
                        background: "linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 100.86%)"
                    }}>
                    <div className='flex flex-col gap-3'>
                        <Text size='15px'>TX Power</Text>
                        <BaseCard bg='#0B2816'>
                            <div className='flex flex-col gap-5'>
                                <SliderDistance
                                    title='L T E'
                                    value={distance.tx.lte}
                                    onChange={handleChange('tx', 'lte')}
                                />
                                <SliderDistance
                                    title='W C D M A'
                                    value={distance.tx.wcdma}
                                    onChange={handleChange('tx', 'wcdma')}
                                />
                                <SliderDistance
                                    title='G S M'
                                    value={distance.tx.gsm}
                                    onChange={handleChange('tx', 'gsm')}
                                />
                            </div>
                        </BaseCard>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Text size='15px'>RX Gain</Text>
                        <BaseCard bg='#0B2816'>
                            <div className='flex flex-col gap-5'>
                                <SliderDistance
                                    title='L T E'
                                    value={distance.rx.lte}
                                    onChange={handleChange('rx', 'lte')}
                                />
                                <SliderDistance
                                    title='W C D M A'
                                    value={distance.rx.wcdma}
                                    onChange={handleChange('rx', 'wcdma')}
                                />
                                <SliderDistance
                                    title='G S M'
                                    value={distance.rx.gsm}
                                    onChange={handleChange('rx', 'gsm')}
                                />
                            </div>
                        </BaseCard>
                    </div>
                    <div className='flex items-center justify-center gap-3 w-1/3 mx-auto'>
                        <Button isCustom={true} icon={iconReset} customColor={"rgba(78, 146, 56, 0.5)"} customBorder={"rgba(96, 255, 43, 1)"}>
                            <Text>Reset</Text>
                        </Button>
                        <Button isCustom={true} icon={iconApply} customColor={"rgba(8, 122, 52, 1)"} customBorder={"rgba(77, 249, 143, 1)"}>
                            <Text>Apply & Save</Text>
                        </Button>
                    </div>
                </div>
            </div>
        </SettingWrapper>
    )
}
