import React from 'react'
import SettingWrapper from '../../components/setting/SettingWrapper'
import CardChannel from '../../components/setting/CardChannel'
import smartfren from '../../assets/provider/smartfren.svg'
import xl from '../../assets/provider/xl.svg'
import im3 from '../../assets/provider/im3.svg'
import telkomsel from '../../assets/provider/telkomsel.svg'


export default function ChannelPage() {
    const channels = [
        { ch: '01', mode: 'FDD-LTE', arfcn: '18350', band: '40', rx: '45', tx: '5', temp: '40',status:'Activated', img: smartfren },
        { ch: '02', mode: 'TDD-LTE', arfcn: '38450', band: '8', rx: '40', tx: '10', temp: '80',status:'Activated', img: im3 },
        { ch: '03', mode: 'FDD-LTE', arfcn: '18500', band: '3', rx: '42', tx: '6', temp: '38',status:'Deactivated', img: smartfren },
        { ch: '04', mode: 'TDD-LTE', arfcn: '38700', band: '41', rx: '47', tx: '8', temp: '55',status:'Activated', img: telkomsel },
        { ch: '05', mode: 'FDD-LTE', arfcn: '19000', band: '1', rx: '44', tx: '7', temp: '60',status:'Activated', img: smartfren },
        { ch: '06', mode: 'TDD-LTE', arfcn: '38950', band: '38', rx: '39', tx: '9', temp: '72',status:'Activated', img: xl },

        { ch: '07', mode: 'FDD-LTE', arfcn: '19500', band: '7', rx: '46', tx: '5', temp: '41',status:'Activated', img: smartfren },
        { ch: '08', mode: 'TDD-LTE', arfcn: '39200', band: '40', rx: '48', tx: '11', temp: '78',status:'Activated', img: xl },
        { ch: '09', mode: 'FDD-LTE', arfcn: '19750', band: '20', rx: '43', tx: '6', temp: '36',status:'Activated', img: smartfren },
        { ch: '10', mode: 'TDD-LTE', arfcn: '39450', band: '41', rx: '50', tx: '12', temp: '82',status:'Deactivated', img: telkomsel },
        { ch: '11', mode: 'FDD-LTE', arfcn: '20000', band: '28', rx: '41', tx: '4', temp: '39',status:'Activated', img: smartfren },
        { ch: '12', mode: 'TDD-LTE', arfcn: '39700', band: '38', rx: '45', tx: '10', temp: '70',status:'Activated', img: im3 },

        { ch: '13', mode: 'FDD-LTE', arfcn: '20250', band: '5', rx: '44', tx: '6', temp: '42',status:'Activated', img: telkomsel },
        { ch: '14', mode: 'TDD-LTE', arfcn: '39950', band: '40', rx: '49', tx: '9', temp: '75',status:'Activated', img: smartfren },
        { ch: '15', mode: 'FDD-LTE', arfcn: '20500', band: '8', rx: '40', tx: '5', temp: '37',status:'Activated', img: xl },
        { ch: '16', mode: 'TDD-LTE', arfcn: '40200', band: '41', rx: '52', tx: '13', temp: '85',status:'Activated', img: smartfren },
        { ch: '17', mode: 'FDD-LTE', arfcn: '20750', band: '12', rx: '43', tx: '7', temp: '48',status:'Activated', img: im3 },
        { ch: '18', mode: 'TDD-LTE', arfcn: '40450', band: '38', rx: '46', tx: '10', temp: '68',status:'Activated', img: smartfren },

        { ch: '19', mode: 'FDD-LTE', arfcn: '21000', band: '2', rx: '45', tx: '6', temp: '44',status:'Activated', img: im3 },
        { ch: '20', mode: 'TDD-LTE', arfcn: '40700', band: '40', rx: '48', tx: '11', temp: '73',status:'Activated', img: smartfren },
        { ch: '21', mode: 'FDD-LTE', arfcn: '21250', band: '66', rx: '42', tx: '5', temp: '35',status:'Activated', img: telkomsel },
        { ch: '22', mode: 'TDD-LTE', arfcn: '40950', band: '41', rx: '50', tx: '12', temp: '79',status:'Activated', img: xl },
        { ch: '23', mode: 'FDD-LTE', arfcn: '21500', band: '26', rx: '41', tx: '6', temp: '46',status:'Activated', img: smartfren },
        { ch: '24', mode: 'TDD-LTE', arfcn: '41200', band: '38', rx: '47', tx: '9', temp: '71',status:'Activated', img: smartfren },
    ]
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
