export default function TableRow({
    children,
    onClick,
    className = "",
}) {
    return (
        <tr
            onClick={onClick}
            className={`hover:bg-white/5 transition-colors duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            {children}
        </tr>
    )
}
