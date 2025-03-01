import { useCallback, useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import NavbarItem from "./NavbarItem"
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs"
import AccountMenu from "./AccountMenu"

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const toogleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, [])

    const toogleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener(`scroll`, handleScroll);

        return () => {
            window.removeEventListener(`scroll`, handleScroll)
        }
    }, [])

    return (
        <nav className="w-full fixed z-40 ">
            <div
            className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            bg-zinc-900
            bg-opacity-90
            ${showBackground? `bg-zinc-900 bg-opacity-90` : ``}
            `}
            >
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
                <div className="
                flex-row
                gap-7
                hidden
                lg:flex
                items-center
                ml-8
                ">
                <NavbarItem label="Home" />
                <NavbarItem label="Series" />
                <NavbarItem label="Films" />
                <NavbarItem label="New & Popular" />
                <NavbarItem label="Mylist" />
                <NavbarItem label="Browser by languages" />
                </div>
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm mr-2">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu? `rotate-180` : `rotate-0`} `} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center ">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>

                    <div onClick={toogleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/pengu.webp" alt="avatar" /> 
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu? `rotate-180` : `rotate-0`}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar