import React from 'react'
import SettingWrapper from '../../components/setting/SettingWrapper'
import Text from '../../components/Text'
import Button from '../../components/Button'
import ScanningProgress from '../../components/setting/ScanningProgress'
import ListSniffer from '../../components/setting/ListSniffer'
import iconApply from '../../assets/ic_apply.svg'
import { FaPlay } from 'react-icons/fa'

export default function SnifferPage() {
    return (
        <SettingWrapper title={"Sniffer"}>
            <div className="flex items-center justify-center mt-5">
                <div
                    className='w-3/4 border border-[#174828] p-5 flex flex-col'
                    style={{
                        background: "linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 100.86%)"
                    }}
                >
                    <div className='flex justify-between items-center gap-5'>
                        <Text size='17px'>SNIFFER</Text>
                        <ScanningProgress progress={50} />
                        <Button className='whitespace-nowrap' icon={<FaPlay/>}>Start Scan</Button>
                    </div>

                    <div className='flex-1 mt-4 pr-2'>
                        <ListSniffer />
                    </div>

                    <div className='flex justify-between items-center mt-4'>
                        <div className='flex items-center gap-5'>
                            <Text size='14px' family='sora'>Count</Text>
                            <span className='px-10 py-1 font-chakra bg-[#0B2816]'>21</span>
                        </div>
                        <Button icon={iconApply}>APPLY</Button>
                    </div>
                </div>
            </div>
        </SettingWrapper>
    )
}
