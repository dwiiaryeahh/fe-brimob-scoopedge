import React from 'react'
import GroupChannel from '../components/channel/GroupChannel'
import ListReport from '../components/report/ListReport'
import Tabs from '../components/Tabs'

export default function ReportPage() {
    const tabs = [
        { value: "all", label: "ALL", content: <div>ALL</div> },
        { value: "whitelist", label: "Whitelist", content: <div>Isi History</div> },
        { value: "blacklist", label: "Blacklist", content: <div>Isi History</div> },
    ]
    return (
        <div className="flex flex-col p-5 gap-5">
            <GroupChannel />
            <div className="flex flex-col w-full h-auto">
                <Tabs defaultValue="all" tabs={tabs} />
                <div className="w-full border border-[#174828] p-5">
                    <ListReport />
                </div>
            </div>
        </div>
    )
}
