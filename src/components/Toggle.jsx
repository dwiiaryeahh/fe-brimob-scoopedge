import React from 'react'
import toggleActiveOn from '../assets/toggle_active_on.svg'
import toggleActiveOff from '../assets/toggle_active_off.svg'
import toggleDeactiveOn from '../assets/toggle_deactive_on.svg'
import toggleDeactiveOff from '../assets/toggle_deactive_off.svg'
import Text from './Text'

export default function Toggle({
    value = true,      // true = ACTIVE, false = INACTIVE
    onChange,
    className = '',
    label
}) {
    return (
        <div className="flex flex-col gap-2">
            <Text>{label}</Text>

            <div className={`flex items-center ${className}`}>
                {/* ACTIVE */}
                <img
                    src={value ? toggleActiveOn : toggleActiveOff}
                    alt="active"
                    className="cursor-pointer select-none"
                    onClick={() => onChange(true)}
                    draggable={false}
                />

                {/* INACTIVE */}
                <img
                    src={!value ? toggleDeactiveOn : toggleDeactiveOff}
                    alt="inactive"
                    className="cursor-pointer select-none -ml-4"
                    onClick={() => onChange(false)}
                    draggable={false}
                />
            </div>
        </div>
    )
}
