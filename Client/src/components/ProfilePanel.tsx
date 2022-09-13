import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context'
import { ToastContainer, toast, ToastContentProps } from "react-toastify";
import { User } from '../types/myTypes'
import axios from "axios";

import { EngInfo } from '../data/infoEng';
import { GeoInfo } from '../data/infoGeo';
import { link } from 'fs';
import { axiosInstance } from '../config';
const ProfilePanel = () => {
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

    const generateError = (err: string) => toast.error(err, {
        position: "bottom-right"
    })

    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });
    const [regValues, setRegValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [vermail, setVermail] = useState(false)

    // useEffect(() => {
    // console.log(contex?.user)
    // console.log(regValues)
    // }, [contex?.user])
    const handleLogout = () => {
        contex?.setIsLoggedIn(false)
        contex?.setUser(null);
        localStorage.clear();
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            console.log(foundUser)
            contex?.setUser(foundUser);
            contex?.setIsLoggedIn(true)
        }
    }, []);
    const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/login", {
                ...loginValues,
            },
                {
                    withCredentials: true,
                }
            );
            if (data) {
                if (data.errors) {
                    const { email, password, status } = data.errors;
                    if (status) generateError(status)
                    if (email) generateError(email)
                    else if (password) generateError(password);
                }
                else {
                    console.log(data)
                    const { username, mail } = data
                    toast.success(`🍋 Happy to see you ${username} !`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    contex?.setIsLoggedIn(true)
                    contex?.resetAll()
                    console.log(data)
                    localStorage.setItem('user', JSON.stringify(data))
                    contex?.setUser(data)
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleRegSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/register", {
                ...regValues,
            },
                {
                    withCredentials: true,
                }
            );
            if (data) {
                if (data.errors) {
                    console.log(data.errors)
                    const { username, email, password } = data.errors;
                    if (username) generateError(username)
                    else if (email) generateError(email)
                    else if (password) generateError(password);
                } else {
                    setVermail(true)
                    setTimeout(() => setVermail(false), 3000);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    (contex?.isProfile && !contex.isLoggedIn) && (
                        <motion.div key="login" className='bg-white absolute w-[90%] md:w-[70%] m-auto top-[200px] left-0 right-0  rounded-[15px] shadow-lg'
                            initial={{ opacity: 0, y: "500px" }}
                            animate={{ opacity: 1, y: "0px" }}
                            exit={{ opacity: 0, y: "-500px" }}
                        >
                            <div className='relative p-[10px] height-[500px] flex flex-col justify-center items-center'>
                                <h1 className='font-semibold text-center mt-[5px]'>{lang.welcome} </h1>
                                <div className='flex flex-col justify-center items-center gap-1 my-[20px]'>
                                    <h2 className='mb-[20px]'>{lang.login}</h2>
                                    <form className='flex flex-col items-center gap-3' onSubmit={(e) => handleLoginSubmit(e)}>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-yellow-light"
                                            onChange={(e) =>
                                                setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
                                            }

                                        />

                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-yellow-light"
                                            onChange={(e) =>
                                                setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
                                            }
                                        />

                                        <button className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-blue">{lang.submit}</button>
                                        <div>
                                            {lang.dontHaveAccount}{" "}
                                            <div className="rounded-[15px] text-center border-[2px] p-2 m-2 border-black bg-orange hover:cursor-pointer"
                                                onClick={() => {
                                                    contex?.resetAll()
                                                    contex?.setIsRegister(!contex?.isRegister)
                                                }}>
                                                {lang.register}
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>

                        </motion.div>
                    )

                }

            </AnimatePresence>
            <AnimatePresence>
                {
                    contex?.isRegister && (
                        <motion.div key="register" className='bg-white absolute w-[90%] md:w-[70%] m-auto top-[200px] left-0 right-0  rounded-[15px] shadow-lg'
                            initial={{ opacity: 0, y: "500px" }}
                            animate={{ opacity: 1, y: "0px" }}
                            exit={{ opacity: 0, y: "-500px" }}
                        >
                            <div className='relative p-[10px] height-[500px] flex flex-col justify-center items-center'>
                                <h1 className='font-semibold text-center mt-[5px]'>{lang.welcome}</h1>
                                <div className='flex flex-col justify-center items-center gap-1 my-[20px]'>
                                    <h2 className='mb-[20px]'>{lang.register}</h2>
                                    <form className='flex flex-col items-center gap-3' onSubmit={(e) => handleRegSubmit(e)}>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Surname"
                                            className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-yellow-light"
                                            onChange={(e) =>
                                                setRegValues({ ...regValues, [e.target.name]: e.target.value })
                                            }

                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-yellow-light"
                                            onChange={(e) =>
                                                setRegValues({ ...regValues, [e.target.name]: e.target.value })
                                            }

                                        />

                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-yellow-light"
                                            onChange={(e) =>
                                                setRegValues({ ...regValues, [e.target.name]: e.target.value })
                                            }
                                        />

                                        <button className="rounded-[15px] border-[2px] p-2 m-2 border-black bg-blue">{lang.submit}</button>

                                    </form>
                                    {
                                        vermail && (
                                            <div className='bg-green p-[20px] rounded-[15px] text-white'>
                                                {lang.linkSent}
                                            </div>
                                        )
                                    }

                                </div>

                            </div>


                        </motion.div>
                    )

                }

            </AnimatePresence>
            <AnimatePresence>
                {
                    (contex?.isProfile && contex.isLoggedIn) && (
                        <motion.div key="login" className='bg-white absolute w-[90%] md:w-[70%] m-auto top-[200px] left-0 right-0  rounded-[15px] shadow-lg'
                            initial={{ opacity: 0, y: "500px" }}
                            animate={{ opacity: 1, y: "0px" }}
                            exit={{ opacity: 0, y: "-500px" }}
                        >
                            <div className='relative p-[10px] height-[500px] flex flex-col justify-center items-center'>

                                <h1 className='font-semibold text-center mt-[5px]'>{lang.greet} <span className='text-orange'>{contex?.user?.username}</span></h1>
                                <div className='flex flex-col justify-center items-center gap-1 my-[20px]'>
                                    <motion.button className='bg-orange p-[15px] rounded-[15px] text-white font-bold my-[100px]'
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleLogout}>
                                        {lang.logout}
                                    </motion.button>

                                </div>

                            </div>

                        </motion.div>
                    )

                }

            </AnimatePresence>


        </>
    )
}

export default ProfilePanel
