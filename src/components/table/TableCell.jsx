export default function TableCell({
    children,
    align = "center",
    className = "",
}) {
    return (
        <td
            className={`py-2 px-4 border-b border-[#4F6E6F] text-xs ${className}`}
            style={{ textAlign: align }}
        >
            {children}
        </td>
    )
}
