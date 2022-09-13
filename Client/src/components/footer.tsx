import React from 'react'
import { useGlobalContext } from '../context'
import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
const Footer = () => {
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

    return (
        <div className='flex flex-col h-[150px] bg-yellow justify-center items-center flex-auto'>
            <div className='text-[20px] text-white'>{lang.contactUs}</div>
            <div className='text-[20px] text-white'>lim01startup@gmail.com</div>
            <div className='flex flex-row self-start mx-[10px] mt-[10px]'>
                <div className='text-white'>{lang.checkDeveloper}: </div>
                <a href='https://lukagorgadze-portfolio.web.app/' className='text-orange mx-[5px] font-bold'>Luka</a>
            </div>
        </div>
    )
}

export default Footer
