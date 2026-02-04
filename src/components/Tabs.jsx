import { useState } from "react"

export default function Tabs({
    defaultValue,
    tabs = [],
    onChange
}) {
    const [activeTab, setActiveTab] = useState(defaultValue)

    return (
        <div className="w-fit">
            <div className="flex bg-[#085523]">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => {
                            setActiveTab(tab.value)
                            onChange(tab.value)
                        }}
                        className={`px-4 py-2 w-39.5 h-12 text-sm font-bold transition ${activeTab === tab.value
                                ? "bg-[#20E766] text-[#0F4C00]"
                                : ""
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
