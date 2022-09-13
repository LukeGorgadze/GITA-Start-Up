import { motion } from 'framer-motion'
import React from 'react'
import Navbar from '../components/Navbar'
import { cafes } from '../data/Cafes'
import { AiFillStar } from 'react-icons/ai'
import { useGlobalContext } from '../context'
import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
const CafePage = () => {
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

    const city = (en:String | null | undefined) => {
        if (contex?.language === 'English') return en;
        switch (en) {
            case "Tbilisi":
                return "თბილისი";
                break;
            case "Kutaisi":
                return "ქუთაისი";
                break;
            case "Telavi":
                return "თელავი";
                break;

            default:
                break;
        }
    }

    return (
        <div className='min-h-[700px]'>
            <Navbar />
            <h1 className='font-bold w-[70%] mx-auto my-[20px]' >{lang.currentCity}: {city(contex?.city)}</h1>

            <div className='flex flex-wrap gap-4 mx-auto my-5 w-[70%] justify-around items-center'>
                {cafes.filter((l: { cityEng: String | null | undefined }, i: any) => l.cityEng === contex?.city).map((el: any, index: any) => {
                    return (<motion.a key={index} href={`/cafe/${el.id}`} className="flex flex-col w-[250px]rounded-[20px]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}>
                        <img src={el.pics[0]} alt="" className='w-[250px] h-[250px] object-cover rounded-[20px]' />
                        <p className='font-bold'>{el.name}</p>
                        <div className='flex flex-row items-center'>
                            <p className='pb-1 mr-2'>{el.rating}</p>
                            <AiFillStar />
                        </div>

                        <p>{contex?.language === 'English'? el.cityEng : el.cityGeo}</p>
                    </motion.a>)
                })}

            </div>
        </div>
    )
}

export default CafePage
