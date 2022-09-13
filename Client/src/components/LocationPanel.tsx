import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { cities } from '../data/Cities'
import { useGlobalContext } from '../context'

import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
const LocationPanel = () => {
    const contex = useGlobalContext()
    const clickHandler = (name: string | React.SetStateAction<String | null>) => {
        contex?.setCity(name)
        contex?.resetAll()
    }
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
    // useEffect(() => {
    //     console.log(contex?.city)
    // }, [contex?.city])
    return (
        <AnimatePresence>
            {contex?.isLocationOpen && (
                <>
                    <div className='hidden md:block'>
                        <motion.div key={"shee"} className='min-h-[400px] w-[50%] h-auto bg-white z-[10] absolute mx-auto rounded-b-[20px] md:flex flex-wrap justify-around items-center gap-4 p-5'
                            initial={{ opacity: 0, x: "0%" }}
                            animate={{ opacity: 1, x: "50%" }}
                            exit={{ opacity: 0, x: "150%" }}

                        >
                            {
                                cities.map((el, index) => {
                                    return <motion.div key={index} className='flex flex-col w-[200px] flex-grow] items-center cursor-pointer'
                                        onClick={() => clickHandler(el.nameEng)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                                        <img src={el.pic} alt="" className='w-[200px] h-[200px] object-cover rounded-[15px]' />
                                        <p>{contex?.language === "English"? el.nameEng : el.nameGeo}</p>
                                    </motion.div>
                                })
                            }
                        </motion.div>
                    </div>

                    <div className='block md:hidden'>
                        <motion.div key={"shee"} className=' bg-white h-auto w-[100%] z-[10] absolute mx-auto rounded-b-[20px] flex flex-wrap justify-around gap-4 p-5'
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}

                        >
                            {
                                cities.map((el, index) => {
                                    return <motion.div key={index} className='flex flex-col w-[45%] h-[200px] flex-grow] items-center cursor-pointer'
                                        onClick={() => clickHandler(el.nameEng)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                                        <img src={el.pic} alt="" className='w-[200px] h-[200px] object-cover rounded-[15px]' />
                                        <p>{contex?.language === "English"? el.nameEng : el.nameGeo}</p>
                                    </motion.div>
                                })
                            }

                        </motion.div>
                    </div>



                </>

            )}
        </AnimatePresence>
    )
}

export default LocationPanel
