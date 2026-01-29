import React from "react"

export default function Text({
    children,
    size = "12px",
    color = "#ffffff",
    weight = "normal",
    align = "left",
    family = 'oxanium',
    className = "",
}) {
    return (
        <p
            className={`${className} font-${family} text-ellipsis`}
            style={{
                fontSize: size,
                color: color,
                fontWeight: weight,
                textAlign: align,
            }}
        >
            {children}
        </p>
    )
}
