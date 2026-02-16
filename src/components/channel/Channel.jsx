import { useState } from "react";

export const Channel = ({
    channel = "CH 02",
    value = "75°",
    status = "active",
    onClickOff = () => console.log("OFF clicked"),
    onClickOn = () => console.log("ON clicked")
}) => {
    const [isOn, setIsOn] = useState(true);

    const handleOffClick = () => {
        setIsOn(false);
        onClickOff();
    };

    const handleOnClick = () => {
        setIsOn(true);
        onClickOn();
    };

    const getBorderColor = () => {
        switch (status) {
            case "active":
                return "#60FF2B";
            case "running":
                return "#2BFF75";
            case "deactive":
                return "#4F6F5A";
            default:
                return "#60FF2B";
        }
    };
    const borderColor = getBorderColor();

    return (
        <div className="flex">
            <div
                className="relative w-36 h-auto"
                style={{
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                        backgroundColor: borderColor,
                    }}
                ></div>

                <div
                    className="relative bg-slate-900"
                    style={{
                        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                        margin: "1px"
                    }}
                >
                    <div
                        className="flex items-center justify-between px-3 py-2 border-b"
                        style={{ borderColor: `${borderColor}` }}
                    >
                        <div className="text-white text-xs font-bold tracking-wider">{channel}</div>
                        <div className="text-white text-xs font-bold">{value}</div>
                    </div>

                    <div className="grid grid-cols-2">
                        <button
                            onClick={handleOffClick}
                            className={`py-2 text-xs font-bold tracking-wider transition-all border-r ${!isOn
                                ? 'text-white bg-slate-800'
                                : 'text-slate-600 bg-slate-900 hover:text-slate-400'
                                }`}
                            style={{ borderColor: `${borderColor}` }}
                        >
                            OFF
                        </button>
                        <button
                            onClick={handleOnClick}
                            className={`py-2 text-xs font-bold tracking-wider transition-all ${isOn
                                ? 'text-white bg-slate-800'
                                : 'text-slate-600 bg-slate-900 hover:text-slate-400'
                                }`}
                        >
                            ON
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
