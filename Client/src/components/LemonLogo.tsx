import { motion } from 'framer-motion'
import React from 'react'
import { FaRegLemon } from 'react-icons/fa'

const LemonLogo = () => {
    return (
        <motion.div className=" hidden md:flex w-[30%] items-center flex-row text-[30px] text-yellow cursor-pointer"
        >
            <motion.a href='/' className='flex flex-row'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

            >
                <FaRegLemon />
                <p className='min-w-[80px] text-[15px] font-bold m-[5px]'>Lim 0 {'->'} 1 </p>
            </motion.a>
        </motion.div>
    )
}

export default LemonLogo
