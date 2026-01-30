import React from 'react'
import iconSniffer from '../../assets/ic_sniffer.svg'
import iconDevice from '../../assets/ic_device.svg'
import { useNavigate } from 'react-router-dom'

export default function HeaderChannel({data}) {
    const navigate = useNavigate()
    return (
        <div className='flex w-full bg-[#07772E]'>
            <div className='flex-1 p-2'>
                <div onClick={()=> navigate('/setting/sniffer')} className='flex flex-row gap-2 cursor-pointer'>
                    <img src={iconSniffer} alt="" />
                    <p>Sniffer</p>
                </div>
            </div>

            <div className='flex-3 p-2 flex flex-row gap-20 justify-center bg-linear-to-r from-[#043F18] via-[#115C2B] to-[#043F18] relative'
                style={{
                    clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0 100%)'
                }}>
                <p>
                    <span className='text-[#60FF2B]'>{data.active}</span>/{data.count} <span className='text-[#60FF2B]'>Active</span>
                </p>
                <p>
                    <span className='text-[#2BFF75]'>{data.running}</span>/{data.count} <span className='text-[#2BFF75]'>Running</span>
                </p>
                <p>
                    <span className='text-[#C4E9FF]'>{data.deactive}</span>/{data.count} <span className='text-[#C4E9FF]'>Deactive</span>
                </p>
                <div className='absolute w-10/12 bottom-0 border border-[#20E766]'></div>
            </div>

            <div className='flex-1 p-2 bg-[#07772E] flex-row items-center'
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)'
                }}>
                <div className='flex flex-row gap-3 justify-end'>
                    <div onClick={()=> navigate('/setting/distance')} className='flex flex-row gap-2 cursor-pointer'>
                        <img src={iconDevice} alt="" />
                        <p>RX TX Setting</p>
                    </div>
                    <div className='flex flex-row gap-2 cursor-pointer'>
                        <img onClick={()=> navigate('/setting/channel')} src={iconDevice} alt="" />
                        <p>Device Status</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
