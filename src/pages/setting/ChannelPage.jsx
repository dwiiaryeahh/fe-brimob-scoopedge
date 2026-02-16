import React, { useMemo } from 'react'
import SettingWrapper from '../../components/setting/SettingWrapper'
import CardChannel from '../../components/setting/CardChannel'
import useHeartbeatWebSocket from '../../hooks/useHeartbeatWebSocket'
import smartfren from '../../assets/provider/smartfren.svg'
import xl from '../../assets/provider/xl.svg'
import im3 from '../../assets/provider/im3.svg'
import telkomsel from '../../assets/provider/telkomsel.svg'


export default function ChannelPage() {
    const { channelsData } = useHeartbeatWebSocket();
    console.log('channelsData', channelsData)

    const staticChannels = [
        { ch: '01', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },
        { ch: '02', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },
        { ch: '03', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },
        { ch: '04', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },
        { ch: '05', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },
        { ch: '06', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },

        { ch: '07', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },
        { ch: '08', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },
        { ch: '09', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },
        { ch: '10', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },
        { ch: '11', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },
        { ch: '12', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Telkomsel', img: telkomsel },

        { ch: '13', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL', img: xl },
        { ch: '14', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL', img: xl },
        { ch: '15', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL', img: xl },
        { ch: '16', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL', img: xl },
        { ch: '17', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Smartfren', img: smartfren },
        { ch: '18', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Smartfren', img: smartfren },

        { ch: '19', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL', img: xl },
        { ch: '20', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL', img: xl },
        { ch: '21', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Smartfren', img: smartfren },
        { ch: '22', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'XL, Indosat', img: [xl, im3] },
        { ch: '23', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },
        { ch: '24', mode: '-', arfcn: '-', band: '-', ul: '-', dl:'-', temp: '-', status: 'Activated', provider: 'Indosat', img: im3 },
    ];

    const getProviderImg = (providerName) => {
        if (!providerName || providerName === '-') return '-';

        const providers = providerName.split(',').map(p => p.trim().toLowerCase());
        const images = providers.map(p => {
            if (p.includes('smartfren')) return smartfren;
            if (p.includes('indosat') || p.includes('im3')) return im3;
            if (p.includes('xl')) return xl;
            if (p.includes('telkomsel')) return telkomsel;
            return '-';
        });

        const validImages = [...new Set(images.filter(img => img !== '-'))];

        if (validImages.length === 0) return '-';
        if (validImages.length === 1) return validImages[0];

        return validImages;
    };

    const channels = useMemo(() => {
        return staticChannels.map(staticChannel => {
            const wsData = channelsData[staticChannel.ch];

            const merged = wsData ? {
                ...staticChannel,
                mode: wsData.mode || staticChannel.mode,
                arfcn: wsData.arfcn || staticChannel.arfcn,
                band: wsData.band || staticChannel.band,
                temp: wsData.temp || staticChannel.temp,
                status: wsData.status || staticChannel.status,
                ul: wsData.ul || staticChannel.ul,
                dl: wsData.dl || staticChannel.dl,
                provider: wsData.provider || staticChannel.provider,
            } : staticChannel;

            const img = getProviderImg(merged.provider);

            return { ...merged, img };
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelsData])
    return (
        <SettingWrapper title={"Channel"}>
            <div className='grid grid-cols-6 gap-3 mt-5'>
                {channels.map((item, index) => (
                    <CardChannel
                        key={index}
                        channel={item}
                    />
                ))}
            </div>
        </SettingWrapper>
    )
}
