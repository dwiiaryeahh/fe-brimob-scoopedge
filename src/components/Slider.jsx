import React, { useState } from 'react'

export default function Slider({
    value = 70,           // nilai awal
    onChange,             // callback saat nilai berubah
    min = 0,              // nilai minimum
    max = 100,            // nilai maximum
    className = ''        // custom className
}) {
    const [localValue, setLocalValue] = useState(value)
    const [isDragging, setIsDragging] = useState(false)

    const handleChange = (e) => {
        const newValue = Number(e.target.value)
        setLocalValue(newValue)
        if (onChange) {
            onChange(newValue) // kirim ke parent
        }
    }

    return (
        <div className={`w-full ${className}`}>
            <div className="relative h-3 flex items-center">
                {/* Track Background */}
                <div className="absolute w-full h-3 bg-[#0A7535]" />

                {/* Active Track (Hijau) */}
                <div
                    className={`absolute h-3 bg-[#4DF98F] transition-all ${isDragging ? 'duration-75' : 'duration-200'
                        }`}
                    style={{ width: `${((localValue - min) / (max - min)) * 100}%` }}
                />

                {/* Thumb (Kotak Putih) */}
                <div
                    className={`absolute w-3 h-6 bg-[#84FFB3] shadow-2xl z-10 transition-all ${isDragging ? 'scale-110' : 'scale-100 hover:scale-105'
                        }`}
                    style={{
                        left: `calc(${((localValue - min) / (max - min)) * 100}% - 10px)`,
                    }}
                />

                {/* Input Range (Invisible) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={localValue}
                    onChange={handleChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                />
            </div>
        </div>
    )
}