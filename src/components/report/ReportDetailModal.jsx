import React from 'react'
import Modal from '../Modal'
import Text from '../Text';
import BaseCard from '../BaseCard';
import ListDetailReport from './ListDetailReport';
import Input from '../Input';
import { FaClock, FaRegClock, FaSearch } from 'react-icons/fa';
import { BsFiletypePdf, BsFiletypeXls } from 'react-icons/bs';

const Item = ({ children }) => {
    return (
        <div className='flex justify-between flex-row gap-3 items-center'>
            {children}
        </div>
    )
}

export default function ReportDetailModal({ title, isOpen, onClose, data }) {
    if (!data) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            type="other"
            width="max-w-7xl"
        >
            <div className='flex flex-row w-full gap-10'>
                <div className="flex flex-col flex-1 gap-5 w-full">
                    <Item>
                        <Text size='16px'>Status</Text>
                        <div className='bg-[#0C9E44] px-7 py-2 w-38.5 text-center'>
                            {data.status}
                        </div>
                    </Item>
                    <Item>
                        <Text size='16px'>Mode</Text>
                        <div className='bg-[#616B81] px-7 py-2 w-38.5 text-center'>
                            {data.mode}
                        </div>
                    </Item>
                    <div className='w-full bg-[#0F5028] text-center py-2 flex justify-center items-center gap-3' style={{
                        border: "1px solid",
                        borderImageSource: "linear-gradient(120.95deg, #00FF62 1.99%, #008A35 34.1%, #005B23 68.89%)",
                        borderImageSlice: 1
                    }}>
                        <FaRegClock size={30} />
                        <Text family='chakra' size='32px'>
                            {data.duration}
                        </Text>
                    </div>
                    <div className='flex flex-row max-w-full justify-between items-center gap-5'>
                        <Item>
                            <Text size='14px'>Start</Text>
                            <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3'>
                                <Text align='center'>
                                    {data.start_time}
                                </Text>
                            </div>
                        </Item>
                        <Item>
                            <Text size='14px'>Stop</Text>
                            <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3'>
                                <Text align='center' className=''>
                                    {data.stop_time}
                                </Text>
                            </div>
                        </Item>
                    </div>
                    <Item>
                        <Text size='14px'>IMSI Detected</Text>
                        <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3 w-24.5'>
                            <Text align='right'>
                                {data.imsi_count}
                            </Text>
                        </div>
                    </Item>
                    <Item>
                        <Text size='14px'>Alert</Text>
                        <div style={{ backgroundColor: "rgba(18, 211, 252, 0.04)" }} className='border border-[#00F25D] py-2 px-3 w-24.5'>
                            <Text align='right'>
                                {data.alert_count}
                            </Text>
                        </div>
                    </Item>
                </div>
                <div className='flex-3'>
                    <BaseCard.All bg='#0B2816'>
                        <div className='gap-3 flex flex-col'>
                            <div className='flex flex-row justify-between gap-3'>
                                <div className='relative'>
                                    <Input
                                        className="rounded-sm bg-linear-to-t from-[#043516] to-[#0F5028] w-full"
                                        placeholder="Search"
                                    />
                                </div>
                                <div className='inline-flex gap-5'>
                                    <button className='flex gap-2 items-center cursor-pointer'>
                                        <BsFiletypeXls color='#CA7A02' />
                                        <Text>EXPORT XLS</Text>
                                    </button>
                                    <button className='flex gap-2 items-center cursor-pointer'>
                                        <BsFiletypePdf color='#01D754' />
                                        <Text>EXPORT PDF</Text>
                                    </button>
                                </div>
                            </div>
                            <ListDetailReport />
                        </div>
                    </BaseCard.All>
                </div>
            </div>
        </Modal>
    )
}
