import React from 'react'
import SettingWrapper from '../../components/setting/SettingWrapper'
import ListLog from '../../components/setting/ListLog'
import Button from '../../components/Button'
import { FaFileAlt } from 'react-icons/fa'
import Text from '../../components/Text'

export default function LogPage() {
    return (
        <SettingWrapper title={"Log"}>
            <div className='mt-5 border border-[#238B47] p-5'>
                <div className='flex flex-row gap-3 mb-3 justify-end'>
                    <Button className='bg-[#086F2C]' icon={<FaFileAlt />}>
                        <Text>
                            Export (.csv)
                        </Text>
                    </Button>
                    <Button className='bg-[#BE1007]' icon={<FaFileAlt />}>
                        <Text>
                            Export (.PDF)
                        </Text>
                    </Button>
                </div>
                <ListLog />
            </div>
        </SettingWrapper>
    )
}
