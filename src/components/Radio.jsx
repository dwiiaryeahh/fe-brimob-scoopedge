export default function Radio({
    name,
    value,
    checked,
    onChange,
    label,
    disabled = false,
    className = "",
}) {
    return (
        <label
            className={`inline-flex items-center gap-2 cursor-pointer select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="hidden"
            />

            <span
                className={`w-4 h-4 rounded-full flex items-center justify-center transition ${checked ? "bg-[#00FF59]" : "bg-white"}`}
            >
                {checked && (
                    <span className="w-2 h-2 rounded-full bg-[#00FF59]" />
                )}
            </span>

            {label && (
                <span className="text-white text-xs">
                    {label}
                </span>
            )}
        </label>
    )
}
