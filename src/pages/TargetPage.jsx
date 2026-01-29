import GroupChannel from "../components/channel/GroupChannel";
import ListTarget from "../components/target/ListTarget";
import StatsSection from "../components/target/StatsSection";

export default function TargetPage() {
    return (
        <div className="flex flex-col p-5 gap-5">
            <GroupChannel />
            <div className="flex flex-row w-full h-auto gap-3">
                <div className="w-4/5 border border-[#174828] p-5">
                    <ListTarget />
                </div>
                <div className="w-2/5 px-3">
                    <StatsSection />
                </div>
            </div>
        </div>
    )
}
