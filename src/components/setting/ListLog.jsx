import React from 'react'
import { BoxAllSide } from '../BaseBox'
import Table from '../table/Table'

export default function ListLog() {
    const columns = [
        { key: "no", label: "No" },
        { key: "task", label: "Taks Name" },
        { key: "start_task", label: "Start Task" },
        { key: "stop_task", label: "Stop Task" },
        { key: "imsi", label: "Imsi" },
    ]

    const data = [
        { no: "1", task: "Task 1", imsi: "1234567890", start_task: "2023-01-01 (17:00:00)", stop_task: "2023-01-01 (17:00:00)", },
        { no: "2", task: "Task 2", imsi: "12312352512", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "3", task: "Task 3", imsi: "1234245212", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "4", task: "Task 4", imsi: "1313123123", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "5", task: "Task 5", imsi: "131235453", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "6", task: "Task 6", imsi: "3453461445", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "7", task: "Task 7", imsi: "654234141", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "7", task: "Task 7", imsi: "654234141", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "7", task: "Task 7", imsi: "654234141", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "7", task: "Task 7", imsi: "654234141", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "7", task: "Task 7", imsi: "654234141", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
        { no: "7", task: "Task 7", imsi: "654234141", start_task: "2023-01-02 (18:00:00)", stop_task: "2023-01-02 (18:00:00)", },
    ]

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                    bgHeader="#309E54"
                />
            </div>
        </div>
    )
}