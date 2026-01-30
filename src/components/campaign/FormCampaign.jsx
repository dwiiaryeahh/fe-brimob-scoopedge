import React, { useRef, useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import BaseCard from '../BaseCard'
import Radio from '../Radio'
import Text from '../Text'

export default function FormCampaign() {
    const [type, setType] = useState("all")
    const [duration, setDuration] = useState("05:00")
    const timeRef = useRef(null)
    return (
        <BaseCard.Form>
            <div className='flex flex-col gap-5'>
                <h3 className='text-xl font-bold font-oxanium'>Start Campaign</h3>
                <Input label={"Campaign Name"} />
                <div className='flex flex-row gap-2 font-oxanium'>
                    <Radio
                        name="blacklist"
                        value="blacklist"
                        label="Blacklist"
                        checked={type === "blacklist"}
                        onChange={() => setType("blacklist")}
                        className='border border-[#00F255] px-3 py-1'
                    />
                    <Radio
                        name="whitelist"
                        value="whitelist"
                        label="Whitelist"
                        checked={type === "whitelist"}
                        onChange={() => setType("whitelist")}
                        className='border border-[#00F255] px-3 py-2'
                    />
                    <Radio
                        name="all"
                        value="all"
                        label="All"
                        checked={type === "all"}
                        onChange={() => setType("all")}
                        className='border border-[#00F255] px-3 py-2'
                    />
                    <div onClick={() => timeRef.current?.showPicker()}
                        className='border border-[#00F255] px-3 py-1 flex items-center gap-1'>
                        <Text>Duration</Text>
                        <Input
                            ref={timeRef}
                            type='time'
                            className='border-none p-0!'
                            value={duration}
                            onChange={setDuration} />
                    </div>
                </div>
                <Button className='w-fit px-10 font-oxanium'>START</Button>
            </div>
        </BaseCard.Form>
    )
}
