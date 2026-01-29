export default function Dropdown({
    open,
    items = [],
    onClose,
}) {
    if (!open) return null

    return (
        <div
            className="absolute top-full mt-2 right-0 min-w-32 text-base font-bold z-50"
            onMouseLeave={onClose}
        >
            <div className="bg-[#0E2A1A] border border-[#174828] rounded-lg overflow-hidden shadow-lg">
                {items.map((item, index) => (
                    <button
                        key={item.label}
                        onClick={item.onClick}
                        className={`w-full cursor-pointer text-left px-4 py-3 text-sm text-white hover:bg-[#174828] transition ${index !== items.length - 1 ? "border-b border-b-[#11AA00]" : ""}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
