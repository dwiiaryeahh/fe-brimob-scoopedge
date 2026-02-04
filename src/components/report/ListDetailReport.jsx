import React, { useMemo } from 'react'
import Table from '../table/Table'
import { columnsDetailReport } from '../table/columns/columnsDetailReport'

export default function ListDetailReport({ data = [], loading = false }) {

    const columns = columnsDetailReport();

    const formattedData = useMemo(() => {
        return (data || []).map((item, index) => ({
            ...item,
            no: (index + 1).toString(),
        }))
    }, [data])

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[32vh] max-h-[35vh] overflow-auto">
            <div className="overflow-auto">
                <Table
                    columns={columns}
                    data={formattedData}
                    loading={loading}
                />
            </div>
        </div>
    )
}