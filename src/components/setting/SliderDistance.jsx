import React from 'react'
import Text from '../Text'
import Slider from '../Slider'

export default function SliderDistance({ title, value, onChange }) {
    return (
        <div className='flex items-center gap-4 w-full'>
            <Text
                size='12px'
                className='w-20 text-right opacity-70 tracking-wider'
            >
                {title}
            </Text>

            <div className='flex-1 flex items-center gap-3'>
                <Slider
                    value={value}
                    onChange={onChange}
                    className='flex-1'
                />
            </div>
        </div>
    )
}
