import { useMemo } from 'react';
import { Channel } from './Channel'
import cutLeft from '../../assets/cut_left.svg'
import cutRight from '../../assets/cut_right.svg'
import HeaderChannel from './HeaderChannel';
import useHeartbeatWebSocket from '../../hooks/useHeartbeatWebSocket';

export default function GroupChannel() {
    const { channelsData } = useHeartbeatWebSocket();

    const staticChannels = [
        { id: 1, channel: "CH 01", value: "-", status: "active" },
        { id: 2, channel: "CH 02", value: "-", status: "active" },
        { id: 3, channel: "CH 03", value: "-", status: "active" },
        { id: 4, channel: "CH 04", value: "-", status: "active" },
        { id: 5, channel: "CH 05", value: "-", status: "active" },
        { id: 6, channel: "CH 06", value: "-", status: "active" },
        { id: 7, channel: "CH 07", value: "-", status: "active" },
        { id: 8, channel: "CH 08", value: "-", status: "active" },
        { id: 9, channel: "CH 09", value: "-", status: "active" },
        { id: 10, channel: "CH 10", value: "-", status: "active" },
        { id: 11, channel: "CH 11", value: "-", status: "active" },
        { id: 12, channel: "CH 12", value: "-", status: "active" },
        { id: 13, channel: "CH 13", value: "-", status: "active" },
        { id: 14, channel: "CH 14", value: "-", status: "active" },
        { id: 15, channel: "CH 15", value: "-", status: "active" },
        { id: 16, channel: "CH 16", value: "-", status: "active" },
        { id: 17, channel: "CH 17", value: "-", status: "active" },
        { id: 18, channel: "CH 18", value: "-", status: "active" },
        { id: 19, channel: "CH 19", value: "-", status: "active" },
        { id: 20, channel: "CH 20", value: "-", status: "active" },
        { id: 21, channel: "CH 21", value: "-", status: "active" },
        { id: 22, channel: "CH 22", value: "-", status: "active" },
        { id: 23, channel: "CH 23", value: "-", status: "active" },
        { id: 24, channel: "CH 24", value: "-", status: "active" },
    ];

    const channels = useMemo(() => {
        return staticChannels.map(staticChannel => {
            const chNum = staticChannel.channel.replace('CH ', '').padStart(2, '0');
            const wsData = channelsData[chNum];

            if (wsData) {
                let status = staticChannel.status;
                if (wsData.state === 'OFFLINE') {
                    status = 'deactive';
                } else if (wsData.state === 'ONLINE') {
                    status = 'active'
                } else {
                    status = 'running'
                }

                return {
                    ...staticChannel,
                    value: wsData.temp && wsData.temp !== '-' ? `${wsData.temp}°` : staticChannel.value,
                    status: status,
                };
            }

            return staticChannel;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelsData]);

    const data = useMemo(() => {
        const stats = channels.reduce((acc, channel) => {
            if (channel.status === 'active') {
                acc.active++;
            } else if (channel.status === 'running') {
                acc.running++;
            } else if (channel.status === 'deactive') {
                acc.deactive++;
            }
            return acc;
        }, { active: 0, running: 0, deactive: 0 });

        return {
            ...stats,
            count: channels.length
        };
    }, [channels]);

    const handleOff = (channelId) => {
        console.log(`${channelId} OFF`);
    };

    const handleOn = (channelId) => {
        console.log(`${channelId} ON`);
    };

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