export default function TableHead({
    children,
    align = "center",
    className = "",
}) {
    return (
        <th
            className={`py-3 px-4 text-xs font-bold uppercase  ${className}`}
            style={{ textAlign: align }}
        >
            {children}
        </th>
    )
}
