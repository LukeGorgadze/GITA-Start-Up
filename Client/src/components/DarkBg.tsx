import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useGlobalContext } from '../context'
const DarkBg = () => {
    const contex = useGlobalContext()
    return (
        <AnimatePresence>
            {
                (contex?.isLangs || contex?.isLocationOpen || contex?.isProfile || contex?.isRegister) && (
                    <motion.div
                        className='w-full h-screen z-1 absolute opacity-[60%] bg-white-trans'
                        onClick={() => {
                            contex?.resetAll()
                        }}
                    >

                    </motion.div>
                )
            }

        </AnimatePresence>
    )
}

export default DarkBg
