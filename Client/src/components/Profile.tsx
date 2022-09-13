import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { HiUserCircle } from 'react-icons/hi'
import { MdLanguage } from 'react-icons/md'
import { useGlobalContext } from '../context'


const Profile = () => {
    const contex = useGlobalContext()

    return (
        <div className='langAndUser w-[50%] justify-center md:w-[30%] flex flex-row md:justify-end items-center '>
            <div className='flex flex-row border-gray-light rounded-[15px] border-[1px]'>
                <motion.div className='flex flex-col justify-center mx-3 cursor-pointer'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        contex?.resetAll()
                        contex?.setIsLangs(!contex?.isLangs)
                    }}
                >
                    <MdLanguage />
                </motion.div>

                <motion.div className='flex flex-row justify-center w-[60px] cursor-pointer'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        contex?.resetAll()
                        contex?.setIsProfile(!contex?.isProfile)
                        console.log(contex?.isProfile)
                    }}
                >
                    <div className="flex flex-col justify-center">
                        <FiMenu />
                    </div>
                    <div className="flex flex-col justify-center text-[30px]">
                        <HiUserCircle />
                    </div>
                </motion.div>
          
            </div>
        </div>
    )
}

export default Profile
