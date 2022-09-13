import React, { ChangeEventHandler, useMemo } from 'react'
import { useNavigate, useParams, } from "react-router-dom";
import { Stack, Rating } from "@mui/material"
import { useState, useEffect, useRef } from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { IoArrowBack } from 'react-icons/io5'
import { motion } from 'framer-motion';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MarkerF } from '@react-google-maps/api'
import { cafes } from '../data/Cafes'
import { restaurants } from '../data/Restaurants'
import { type } from '@testing-library/user-event/dist/type';
import { ToastContainer, toast, ToastContentProps } from "react-toastify";
import axios from 'axios'
import { useGlobalContext } from '../context'
import Moment from 'moment';


import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
import { axiosInstance } from '../config';

type propType = {
  placeType: number,
  id?: string
}

type placeTypeObject = {
  name: string;
  offersEng: string;
  offersGeo: string;
  cityGeo: string;
  cityEng: string;
  coords: number[];
  pics: string[];
  rating: number;
  id: string;
}
type commentType = {
  username: string,
  date: string,
  text: string,
  rating: number
}



const generateError = (err: string) => toast.error(err, {
  position: "bottom-right"
})




const Place = (props: propType) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB0ZVK44vEor1msqkCoNO2ocT0lctpCLAY",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map placeType={props.placeType} />;
}

function Map(props: propType) {
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

  let { id } = useParams();
  console.log(id)
  const [comment, setComment] = useState<commentType | null>(null)
  const [allComments, setAllComments] = useState<Array<commentType> | null>(null)
  const [myData, setMyData] = useState<Array<placeTypeObject> | null>(null)
  const [myPlace, setMyPlace] = useState<placeTypeObject | null | undefined>(null)

  useEffect(() => {
    // console.log(props?.placeType)
    const dat = props?.placeType === 0 ? cafes : restaurants;
    setMyPlace(dat.find(el => el.id === id))
    setMyData(dat)
    GetComments()

  }, [id])



  // const center = { lat: myPlace?.coords[0], lng:myPlace?.coords[0] };

  console.log(allComments)

  const center = new google.maps.LatLng({
    lat: myPlace ? myPlace?.coords[0] as number : 1,
    lng: myPlace ? myPlace?.coords[1] as number : 0,
    // lat:1,
    // lng:2
  })

  const [rating, setRating] = useState<number | null>(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRating(newValue)
  }

  const [text, setText] = useState<string | undefined>("")
  const [Date, setDate] = useState<string | null>(null)

  const commentChange = ((ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
    ev.preventDefault()
    setText(ev.target.value)
  })




  console.log(rating)
  let history = useNavigate();

  const GetComments = async () => {
    if (id == null) return
    if (!id) return
    if (id === undefined) return
    try {
      const config = {
        data: {
          "id": id,
        },
        params: {}
      }
      const { data } = await axiosInstance.post("/comments/get", config
      );
      if (data) {
        if (data.codeLuke === "NotGut") {
          console.log("No data in cloud")

        }
        else {
          setAllComments(data.comments)
          console.log("Successfully fethched comments")

        }

      }
    } catch (err) {
      console.log(err);
    }

  }
  const AddComment = async () => {
    const date = Moment().format("MMM Do YY")
    try {
      const config = {
        data: {
          "id": id,
          "comment": {
            "username": contex?.user?.username,
            "date": date,
            "text": text,
            "rating": rating == null ? 0 : rating
          }
        },
        params: {}
      }

      console.log(config)
      const { data } = await axiosInstance.post("/comments/add", config
      );
      if (data) {
        console.log("Successfully fethched comments")
      }
    } catch (err) {
      console.log(err);
    }
    setText("")
    setRating(0)
    GetComments()

  }

  // useEffect(() => {
  //   scrollToBottom()
  // }, [allComments])
  const bottom = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (bottom) {
      bottom?.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'end' })
    }
  }

  return (
    <div className=' flex flex-col w-[70%] mx-auto mt-[50px]'>

      <motion.div className='md:hidden text-[18px] w-[50px] mt-2 flex flex-row items-center cursor-pointer'
        onClick={() => history(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoArrowBack />
        <p className='text-[15px] font-bold' >{lang.back}</p>
      </motion.div>

      <div className='md:hidden h-[300px] bg-blue rounded-[15px] my-[10px]'>
        <img src={myPlace?.pics[0]} alt="" className='w-[100%] h-[100%] object-cover rounded-[15px]' />
      </div>
      <h1 className='font-bold my-[5px]'>{myPlace?.name}</h1>
      <div className='hidden md:flex flex-row'>
        <div className='w-[50%] h-[400px] bg-blue rounded-l-[15px] mr-2'>
          <img src={myPlace?.pics[0]} alt="" className='w-[100%] h-[100%] object-cover rounded-l-[15px]' />
        </div>
        <div className='grid grid-cols-2 grid-rows-2 w-[50%] h-[400px] gap-2'>
          <div className=' bg-blue '>
            <img src={myPlace?.pics[1]} alt="" className='w-[100%] h-[100%] object-cover' />
          </div>
          <div className=' bg-blue rounded-tr-[15px]'>
            <img src={myPlace?.pics[2]} alt="" className='w-[100%] h-[100%] object-cover rounded-tr-[15px]' />
          </div>
          <div className=' bg-blue '>
            <img src={myPlace?.pics[3]} alt="" className='w-[100%] h-[100%] object-cover' />
          </div>
          <div className=' bg-blue rounded-br-[15px]'>
            <img src={myPlace?.pics[4]} alt="" className='w-[100%] h-[100%] object-cover rounded-br-[15px]' />
          </div>
        </div>
      </div>
      <div className='flex flex-col' >
        <h1 className='font-bold my-[20px] mt-[50px]'>{lang.placeOffers}</h1>
        <h1>{contex?.language === 'English'? myPlace?.offersEng: myPlace?.offersGeo}</h1>
      </div>
      <div className='my-5'>
        <h1 className='font-bold mt-[50px]'>{lang.whereUat}</h1>
        <div className='bg-gray-light h-[300px] rounded-[15px] my-[20px]'>
          <GoogleMap zoom={18} center={center} mapContainerClassName="map-container">
            <MarkerF position={center} />
          </GoogleMap>

        </div>
      </div>

      {/* COMMENT SECTION */}

      <div className='font-bold mt-[50px]'>{lang.reviews}</div>

      <div className=' w-full h-[500px] overflow-y-scroll my-[50px] border-b-[1px] border-t-[1px]'>

        {allComments?.map((comment, index) => {

          return <div key={index} id="chat" className='border-[1px] rounded-[15px] p-5 my-[20px] '>
            <div className='flex flex-row justify-between'>
              <h1 className='w-auto font-bold text-[20px]'>{comment.username ? comment.username : "Guest"}</h1>
              <Stack spacing={5} className=''>
                <Rating name="read-only"
                  icon={<HiStar />}
                  emptyIcon={<HiOutlineStar />}
                  size='large' value={comment?.rating} />
              </Stack>
            </div>
            <h1 className='my-[10px]'>{comment?.text}</h1>
            <p className='text-[12px]'>{comment?.date}</p>
          </div>
        })}

        <div ref={bottom}></div>
      </div>

      {
        contex?.isLoggedIn && (
          <>
            <h1 className='font-bold mt-[50px]'>{lang.Addreview}</h1>
            <div className='flex flex-col'>
              <div className='mt-3'>
                <Rating name="simple-controlled"
                  icon={<HiStar />}
                  emptyIcon={<HiOutlineStar />}
                  size='large' value={rating} onChange={handleChange} />
              </div>


              <textarea
                className=" w-full px-3 py-[20px] text-base bg-clip-padding border border-solid border-gray-300 rounded-[15px] my-3"
                placeholder="Your message"
                value={text}
                onChange={commentChange}
              > </textarea>

              <div className='flex flex-col items-end my-3'>
                <motion.button className='mb-[200px] border-[1px] rounded-[15px] p-2'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => AddComment()}>{lang.send}</motion.button>
              </div>

            </div>
          </>
        )
      }

    </div >
  )
}

export default Place
