import React, { forwardRef } from "react"

const Input = forwardRef(function Input(
    {
        label,
        value,
        onChange,
        placeholder,
        type = "text",
        error,
        helper,
        disabled = false,
        className = "",
    },
    ref
) {
    return (
        <div className="flex flex-col gap-1 w-full font-oxanium">
            {label && (
                <label className="text-sm font-semibold text-gray-300">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                type={type}
                value={value}
                disabled={disabled}
                placeholder={placeholder ?? label}
                onChange={(e) => onChange?.(e.target.value)}
                className={`p-2 bg-transparent text-white outline-none transition border text-xs border-[#0ADD5B]
          ${error ? "border-red-500 focus:border-red-500" : " focus:border-green-400"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}`}
            />

            {error ? (
                <span className="text-xs text-red-500">{error}</span>
            ) : helper ? (
                <span className="text-xs text-gray-400">{helper}</span>
            ) : null}
        </div>
    )
})

export default Input
