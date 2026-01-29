import BaseCard from "./BaseCard"

function Button({
    children,
    onClick,
    icon,
    disabled = false,
    type = "button",
    className = "",
    isCustom = false,
    customColor,
    customBorder,
}) {
    if (isCustom) {
        return (
            <BaseCard padding={8} bg={customColor} borderColor={customBorder}>
                <div className="flex items-center justify-center gap-2 w-full h-full leading-none cursor-pointer">
                    <Button.Children icon={icon}>
                        {children}
                    </Button.Children>
                </div>
            </BaseCard>
        )
    }


    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`inline-flex items-center gap-2 px-3 py-2 bg-[#0B8E39] 
                font-semibold text-xs text-white transition 
                hover:brightness-125 
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                ${className}`}
        >
            <Button.Children icon={icon} children={children}>
            </Button.Children>
        </button>
    )
}

Button.Children = function ButtonChildren({ icon, children }) {
    return (
        <>
            {
                icon && (
                    <span className="flex flex-row items-center">
                        {typeof icon === "string" ? (
                            <img src={icon} alt="" className="w-4 h-4" />
                        ) : (
                            icon
                        )}
                    </span>
                )
            }
            <span>{children}</span>
        </>
    )
}

export default Button
