import TableHeader from "./TableHeader"
import TableBody from "./TableBody"

export default function Table({
    columns,
    data,
    loading = false,
    bgHeader = "#08682A",
    onRowClick,
}) {
    if (loading) return (
        <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FF62]"></div>
        </div>
    )
    return (
        <div className="w-full overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <TableHeader columns={columns} bg={bgHeader} />
                    {!data || data.length === 0 ? (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center text-[#FFFFFF]/50 py-4"
                                >
                                    Data Not Found
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <TableBody
                            columns={columns}
                            data={data}
                            onRowClick={onRowClick}
                        />
                    )}
                </table>
            </div>
        </div>
    )
}
