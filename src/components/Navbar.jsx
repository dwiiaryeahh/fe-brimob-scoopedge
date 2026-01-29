import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import bgNav from '../assets/navbar/bg_nav.svg';
import bgNavList from '../assets/navbar/bg_nav_list.svg';
import targetIcon from '../assets/navbar/ic_target.svg';
import campaignIcon from '../assets/navbar/ic_campaign.svg';
import reportIcon from '../assets/navbar/ic_report.svg';
import settingIcon from '../assets/navbar/ic_setting.svg';
import switchIcon from '../assets/navbar/ic_switch.svg';
import chevronIcon from '../assets/navbar/ic_chevron_down.svg';
import { useState } from 'react';
import Dropdown from './Dropdown';

const Navbar = () => {
    const navigate = useNavigate()
    const isSettingActive = useMatch('/setting/*')
    const navItems = [
        { name: 'Target', path: '/target', activeIcon: targetIcon },
        { name: 'Campaign', path: '/campaign', activeIcon: campaignIcon },
        { name: 'Report', path: '/report', activeIcon: reportIcon },
        {
            name: 'Setting',
            activeIcon: settingIcon,
            chevronIcon: chevronIcon,
            dropdown: true,
        },
    ]
    const settingDropdownItems = [
        {
            label: "Channel",
            onClick: () => {
                navigate('setting/channel')
            },
        },
        {
            label: "Sniffer",
            onClick: () => {
                navigate('setting/sniffer')
            },
        },
        {
            label: "Distance Radius",
            onClick: () => {
                navigate('setting/distance')
            },
        },
        {
            label: "About",
            onClick: () => {
                navigate('setting/about')
            },
        },
        {
            label: "Log",
            onClick: () => {
                navigate('setting/log')
            },
        },
        {
            label: "Exit",
            onClick: () => {
                setOpenDropdown(null)
            },
        },
    ]

    const [openDropdown, setOpenDropdown] = useState(null)


    const switchRedirect = () => {
        // Logic for switch action
        // window.location.href = 'https://example.com/switch';
    }

    return (
        <nav className="relative w-full h-17.5 flex items-center justify-between px-10 z-50">
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <img
                    src={bgNav}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>

            <div className="flex items-center gap-3 relative z-10">
                <img src={logo} alt="Logo" className="h-12 w-12" />
                <span className="text-white text-[32px] font-bold tracking-widest uppercase font-oxanium">
                    SCOOPEEDGE
                </span>
            </div>

            <div className='flex flex-row gap-10 items-center'>
                <ul className="flex items-center gap-5 h-full relative z-10">
                    {navItems.map((item) => (
                        <li key={item.name} className="h-full relative">
                            {item.dropdown ? (
                                <button
                                    onClick={() =>
                                        setOpenDropdown(
                                            openDropdown === item.name ? null : item.name
                                        )
                                    }
                                    className="relative h-full px-4 flex items-center justify-center min-w-40 cursor-pointer"
                                >
                                    {isSettingActive && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <img
                                                src={bgNavList}
                                                alt=""
                                                className="w-48 h-16 max-w-none object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 z-50">
                                        <img src={item.activeIcon} alt="" />
                                        <span className="text-[14px] font-bold tracking-widest uppercase text-white font-oxanium">
                                            {item.name}
                                        </span>
                                        <img src={item.chevronIcon} alt="" className='w-4 h-4' />
                                    </div>

                                    {/* DROPDOWN */}
                                    <Dropdown
                                        open={openDropdown === item.name}
                                        onClose={() => setOpenDropdown(null)}
                                        items={settingDropdownItems}
                                    />
                                </button>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    className="relative h-full px-4 flex items-center justify-center min-w-40"
                                >
                                    {({ isActive }) => (
                                        <div className="relative flex items-center justify-center h-full w-full">
                                            {isActive && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <img
                                                        src={bgNavList}
                                                        alt=""
                                                        className="w-48 h-16 max-w-none object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1 z-50">
                                                <img src={item.activeIcon} alt="" />
                                                <span className="relative z-10 text-[14px] font-bold tracking-widest uppercase text-white font-oxanium">
                                                    {item.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </NavLink>
                            )}
                        </li>
                    ))}

                </ul>
                <img src={switchIcon} onClick={switchRedirect} alt="Switch" className="h-5 w-5 cursor-pointer" />
            </div>
        </nav>
    );
};

export default Navbar;
