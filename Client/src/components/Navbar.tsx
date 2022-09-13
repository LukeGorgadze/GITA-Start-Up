import React from 'react'
import { IconContext } from 'react-icons/lib/esm/iconContext';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import * as Icons from "react-icons/io5";
import { IoCafeOutline, IoRestaurantOutline } from 'react-icons/io5'
import { motion } from 'framer-motion';
import { useGlobalContext } from '../context'
import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
interface Props {
  href?: string;
  text?: string;
}

const Navbar: React.FC<Props> = () => {

  const contex = useGlobalContext()
  type custButt = {
    to: string,
    children: React.ReactNode,
  }
  function CustomButtonLink(props: custButt) {
    const resolvedPath = useResolvedPath(props.to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (

      <Link to={props.to}>
        <motion.button className={isActive ? 'active-icon' : 'icon'}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}>
          {props.children}
        </motion.button>
      </Link >


    )
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

  return (

    <div className='bg-white flex justify-center gap-[30px] w-[70%] mx-auto mt-[5px] rounded-[15px] h-[60px] shadow-2xl top-[40px] z-[2]'>
      <CustomButtonLink to='/cafe'>
        <IoCafeOutline />
        <p className='text-[10px] mt-1 font-bold'>{lang.cafes}</p>
      </CustomButtonLink>


      <CustomButtonLink to='/restr'>
        <IoRestaurantOutline />
        <p className='text-[10px] mt-1 font-bold'>{lang.restaurants}</p>
      </CustomButtonLink>
    </div>

  )
}

export default Navbar
