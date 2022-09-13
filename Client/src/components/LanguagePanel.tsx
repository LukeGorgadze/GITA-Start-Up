import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useGlobalContext } from '../context'

import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
const LanguagePanel = () => {
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
        <AnimatePresence>
            {
                contex?.isLangs && (
                    <motion.div className='bg-white absolute w-[90%] md:w-[70%] m-auto top-[200px] left-0 right-0  rounded-[15px] shadow-lg'
                        initial={{ opacity: 0, y: "500px" }}
                        animate={{ opacity: 1, y: "0px" }}
                        exit={{ opacity: 0, y: "-500px" }}>
                        <div className='relative p-[10px] height-[300px] flex flex-col items-center'>
                            <h1 className='font-semibold text-center mt-[20px]'>{lang.languageSettings}</h1>
                            <div className='flex flex-row h-[300px] justify-center items-center gap-3'>
                                <div className='p-4 shadow-lg rounded-[15px] border-[1px] border-gray-light hover:bg-gray-light cursor-pointer'
                                onClick={() => contex?.setLanguage("English")}>
                                    English
                                </div>
                                <div className='p-4 shadow-lg rounded-[15px] border-[1px] border-gray-light hover:bg-gray-light cursor-pointer'
                                onClick={() => contex?.setLanguage("Georgian")}>
                                    ქართული
                                </div>
                            </div>
                            {/* <div className='my-[20px] bg-orange p-5 rounded-[15px]'>
                                Only English works for now, Deal with it xD
                            </div> */}
                        </div>
                    </motion.div>
                )

            }

        </AnimatePresence>
    )
}

export default LanguagePanel
