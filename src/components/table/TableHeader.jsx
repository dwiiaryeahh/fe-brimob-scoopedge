import TableRow from "./TableRow"
import TableHead from "./TableHead"

export default function TableHeader({ columns, bg = "#08682A"}) {
    return (
        <thead className={`bg-[${bg}]`}>
            <TableRow>
                {columns.map((col) => (
                    <TableHead
                        key={col.key}
                        align={col.align}
                    >
                        {col.label}
                    </TableHead>
                ))}
            </TableRow>
        </thead>
    )
}
