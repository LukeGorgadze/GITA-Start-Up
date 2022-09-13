import { motion } from 'framer-motion'
import React from 'react'
import Navbar from '../components/Navbar'
import { cafes } from '../data/Cafes'
import { restaurants } from '../data/Restaurants'
import { AiFillStar } from 'react-icons/ai'
import { useGlobalContext } from '../context'
const MainPage = () => {
    const contex = useGlobalContext()
    return (
        <div className='min-h-[700px]'>
            <Navbar />
            
            <div className='flex flex-wrap gap-4 mx-auto my-5 w-[70%] justify-around items-center'>
                {cafes.map((el : any, index : any) => {
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
                {restaurants.map((el, index) => {
                    return (<motion.a key={index} href={`/restr/${el.id}`} className="flex flex-col w-[250px]rounded-[20px]"
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

export default MainPage
