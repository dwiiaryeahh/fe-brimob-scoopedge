import { Channel } from './Channel'
import cutLeft from '../../assets/cut_left.svg'
import cutRight from '../../assets/cut_right.svg'
import HeaderChannel from './HeaderChannel';

export default function GroupChannel() {
    const channels = [
        { id: 1, channel: "CH 01", value: "75°", status: "active" },
        { id: 2, channel: "CH 02", value: "80°", status: "running" },
        { id: 3, channel: "CH 03", value: "65°", status: "deactive" },
        { id: 4, channel: "CH 04", value: "70°", status: "active" },
        { id: 5, channel: "CH 05", value: "85°", status: "running" },
        { id: 6, channel: "CH 06", value: "60°", status: "deactive" },
        { id: 7, channel: "CH 07", value: "78°", status: "active" },
        { id: 8, channel: "CH 08", value: "82°", status: "running" },
        { id: 9, channel: "CH 09", value: "68°", status: "deactive" },
        { id: 10, channel: "CH 10", value: "73°", status: "active" },
        { id: 11, channel: "CH 11", value: "79°", status: "running" },
        { id: 12, channel: "CH 12", value: "66°", status: "deactive" },
        { id: 13, channel: "CH 13", value: "76°", status: "active" },
        { id: 14, channel: "CH 14", value: "81°", status: "running" },
        { id: 15, channel: "CH 15", value: "64°", status: "deactive" },
        { id: 16, channel: "CH 16", value: "77°", status: "active" },
        { id: 17, channel: "CH 17", value: "83°", status: "running" },
        { id: 18, channel: "CH 18", value: "67°", status: "deactive" },
        { id: 19, channel: "CH 19", value: "74°", status: "active" },
        { id: 20, channel: "CH 20", value: "86°", status: "running" },
        { id: 21, channel: "CH 21", value: "62°", status: "deactive" },
        { id: 22, channel: "CH 22", value: "71°", status: "active" },
        { id: 23, channel: "CH 23", value: "84°", status: "running" },
        { id: 24, channel: "CH 24", value: "69°", status: "deactive" },
    ];

    const handleOff = (channelId) => {
        console.log(`${channelId} OFF`);
    };

    const handleOn = (channelId) => {
        console.log(`${channelId} ON`);
    };

    const data = {
        "active": 16,
        "running": 4,
        "deactive": 4,
        "count": 24
    }

    return (
        <>
            <div className='flex flex-col font-oxanium text-xs'>
                <HeaderChannel data={data} />
                <div className='relative p-3 border border-t-0 border-[#4F6F5A]'>
                    <div className='absolute -left-[1.1px] top-0'>
                        <img src={cutLeft} alt="" />
                    </div>
                    <div className='absolute -right-[1.5px] top-0'>
                        <img src={cutRight} alt="" />
                    </div>
                    <div className='grid grid-cols-6 md:grid-cols-12 gap-3'>
                        {channels.map((ch) => (
                            <Channel
                                key={ch.id}
                                channel={ch.channel}
                                value={ch.value}
                                status={ch.status}
                                onClickOff={() => handleOff(ch.channel)}
                                onClickOn={() => handleOn(ch.channel)}
                            />
                        ))}
                    </div>
                    <div className='absolute w-1/2 -bottom-[1.5px] border border-[#20E766] -translate-x-1/2 left-1/2'></div>
                </div>
            </div>
        </>
    );
}