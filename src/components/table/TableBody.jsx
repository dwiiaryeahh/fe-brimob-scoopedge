import TableRow from "./TableRow"
import TableCell from "./TableCell"

export default function TableBody({
    columns,
    data,
    onRowClick,
}) {
    return (
        <tbody>
            {data.map((row, index) => (
                <TableRow
                    key={index}
                    onClick={onRowClick ? () => onRowClick?.(row) : undefined}
                >
                    {columns.map((col) => (
                        <TableCell
                            key={col.key}
                            align={col.align}
                        >
                            {col.render ? col.render(row) : row[col.key]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </tbody>
    )
}
