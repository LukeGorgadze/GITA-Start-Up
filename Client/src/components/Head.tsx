import React, { useState } from 'react'
import { FaRegLemon } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion';
import { IoEarthSharp, IoSearchCircle } from 'react-icons/io5'
import { MdLanguage } from 'react-icons/md'
import { HiUserCircle } from 'react-icons/hi'
import { FiMenu } from 'react-icons/fi'
import { useGlobalContext } from '../context'
import { cities } from '../data/Cities'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './SearchBar'
import LemonLogo from './LemonLogo';
import Profile from './Profile'
import LocationPanel from './LocationPanel'
import DarkBg from './DarkBg'
import LanguagePanel from './LanguagePanel'
import ProfilePanel from './ProfilePanel'
import { ToastContainer, toast, ToastContentProps } from "react-toastify";

import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';



interface Props {
    href?: string;
    text?: string;
}

const Head: React.FC<Props> = () => {

    const contex = useGlobalContext()
    let lang;
    switch (contex?.language) {
        case "English":
            lang = EngInfo;
            break;
        case "Georgian":
            lang = GeoInfo;
            break;
        default:
            lang = EngInfo;
            break;
    }
    const variants = {
        norm: { opacity: 0, x: 0, width: 0, height: 0, },
        large: { opacity: 1, x: "50%", width: "50%", height: "400px" },


    }
    return (
        <React.Fragment>
            <div className="relative z-5 pt-5 bg-white">
                <motion.div className=' w-full mx-auto h-auto border-gray-light border-b-2 sticky z-5 '
                >

                    {/* LEMON ICON */}
                    <div className="headContent flex flex-col h-auto justify-center items-center md:justify-between  md:flex-row  w-[70%] gap-[30px] md:h-[60px] mx-auto pb-5">
                        <LemonLogo />
                        <SearchBar />
                        <Profile />
                    </div>
                    <LocationPanel />

                    {/* DARK BACKGROUND */}
                    <DarkBg />
                </motion.div>


            </div>

            {/* LANGUAGE SETTINGS */}
            <LanguagePanel />

            {/* PROFILE */}
            {/* LOGIN REGISTER */}
            <ProfilePanel />


            <ToastContainer />



        </React.Fragment>

    )
}

export default Head
