import GroupChannel from '../components/channel/GroupChannel'
import ListCampaign from '../components/campaign/ListCampaign'
import FormCampaign from '../components/campaign/FormCampaign'
import TimerImsi from '../components/campaign/TimerImsi'
import ControlPanel from '../components/campaign/ControlPanel'
import { CampaignProvider } from '../context/CampaignContext'

export default function CampaignPage() {
    return (
        <CampaignProvider>
            <div className="flex flex-col p-5 gap-5">
                <GroupChannel />
                <div className="flex flex-row w-full h-auto gap-3">
                    <div className="w-4/5 border border-[#174828] p-5">
                        <ListCampaign />
                    </div>
                    <div className="w-2/5 px-3 flex flex-col gap-4.5">
                        <ControlPanel />
                        <FormCampaign />
                        <TimerImsi />
                    </div>
                </div>
            </div>
        </CampaignProvider>
    )
}
