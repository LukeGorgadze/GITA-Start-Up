import { motion } from 'framer-motion'
import React from 'react'
import Navbar from './components/Navbar'



var axios = require('axios');


// fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyB0ZVK44vEor1msqkCoNO2ocT0lctpCLAY')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// var config = {
//   method: 'get',
//   url: 'http://localhost:5000/fetchCafes',
//   headers: {}
// };

// axios(config)
//   .then(function (response: { data: any; }) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error: any) {
//     console.log(error);
//   });

const App = () => {

  return (
    <>
      <Navbar />
      {/* <div className='flex flex-wrap gap-4 mx-auto my-5 w-[70%] justify-around items-center'>

        <motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}></motion.a>
        <motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}></motion.a><motion.a href='/place/1' className="div w-[200px] h-[200px] bg-yellow rounded-[20px]"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}></motion.a>
      </div> */}
    </>
  )
}

export default App
