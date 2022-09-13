import React from 'react'
import { IoSearchCircle } from 'react-icons/io5';
import { useGlobalContext } from '../context'
import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
const SearchBar = () => {
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
        <div className='searchBar border-[1px] border-gray-light rounded-[15px] w-[50%] md:w-[30%] hover:shadow-md duration-200 cursor-pointer flex flex-row justify-center items-center font-bold '
            onClick={() => {
                contex?.resetAll()
                contex?.setIsLocationOpen(!contex?.isLocationOpen);

            }}
        >
            <p className='text-[12px]  md:text-[15px] text-center m-2'>{lang.locationBar}</p>
            <div className='text-[40px] text-yellow'>
                <IoSearchCircle />
            </div>
        </div>
    )
}

export default SearchBar
