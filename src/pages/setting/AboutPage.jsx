import logo from '../../assets/logo.svg'
import bgTitle from '../../assets/about/bg_title.svg'
import bgSNRight from '../../assets/about/bg_sn_right.svg'
import bgSNLeft from '../../assets/about/bg_sn_left.svg'
import iconX from '../../assets/about/ic_x.svg'
import SettingWrapper from '../../components/setting/SettingWrapper'

export default function AboutPage() {

    return (
        <SettingWrapper title={"About"}>
            <div className='flex justify-center flex-col items-center'>
                <div className='flex flex-col items-center font-oxanium mb-5'>
                    <img src={logo} className='w-32 mt-20' />
                    <h1 className='text-3xl font-bold mt-3'>Scoop Edge</h1>
                    <p className='mt-3'>Authentication Hunter</p>
                    <p className='mb-3'>Anonymous</p>
                    <p>ver 00000 2023</p>
                </div>
                <div className='relative'>
                    <img src={bgTitle} />
                    <div className='absolute inset-0 font-bold flex items-center justify-center font-sora text-sm'>
                        kJijkqwe909
                    </div>
                </div>
                <div className=''>
                    <div className='flex flex-row justify-around items-center font-oxanium space-x-20 my-5'>
                        <div className='text-base font-bold'>SERIAL NUMBER</div>
                        <div className='text-base font-bold'>SERIAL NUMBER</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='relative'>
                            <img src={bgSNLeft} alt="" />
                            <div className='absolute inset-0 font-bold flex items-center justify-center font-sora text-sm'>
                                GT30-J345-tafP-1ygo
                            </div>
                        </div>
                        <img src={iconX} alt="" className='mx-2' />
                        <div className='relative'>
                            <img src={bgSNRight} alt="" />
                            <div className='absolute inset-0 font-bold flex items-center justify-center font-sora text-sm'>
                                kJijkqwe909
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SettingWrapper>
    )
}