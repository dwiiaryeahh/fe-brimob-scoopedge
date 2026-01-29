import React from 'react'
import iconImsi from '../../assets/stats/ic_imsi.svg'
import iconAlert from '../../assets/stats/ic_alert.svg'
import iconWhitelist from '../../assets/stats/ic_whitelist.svg'
import iconBlacklist from '../../assets/stats/ic_blacklist.svg'
import CardStats from './CardStats'
import ChartStats from './ChartStats'

export default function StatsSection() {
    return (
        <div className='flex flex-col w-full gap-3'>
            <div className="grid grid-cols-2 gap-3 place-items-start">
                <CardStats icon={iconImsi} title="Total IMSI" value="1200" />
                <CardStats icon={iconAlert} title="Alert IMSI" value="1200" />
                <CardStats icon={iconWhitelist} title="Whitelist IMSI" value="1200" />
                <CardStats icon={iconBlacklist} title="Blacklist IMSI" value="1200" />
            </div>
            <ChartStats />
        </div>
    )
}
