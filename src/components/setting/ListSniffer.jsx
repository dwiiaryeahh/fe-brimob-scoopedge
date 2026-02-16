import React, { useMemo } from 'react'
import { BoxAllSide } from '../BaseBox'
import Table from '../table/Table'
import { columnsSniffer } from '../table/columns/columnsSniffer'

export default function ListSniffer({ sniffingData = [] }) {
    const columns = columnsSniffer();

    const dataWithNumbers = useMemo(() => {
        return sniffingData.map((item, index) => ({
            ...item,
            no: (index + 1).toString(),
        }));
    }, [sniffingData]);

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div>
                <Table
                    columns={columns}
                    data={dataWithNumbers}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                    bgHeader="#309E54"
                />
            </div>
        </div>
    )
}