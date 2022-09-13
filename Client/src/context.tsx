import React, { useState, useContext, useEffect } from 'react'
import { User, AppContextType } from "./types/myTypes"


const AppContextState = {
    isLocationOpen: false,
    isLangs: false,
    isProfile: false,
    isRegister: false,
    isLoggedIn: false,
    user: null,
    city: null,
    language: "English",
    setIsLocationOpen: () => { },
    setIsLangs: () => { },
    setIsProfile: () => { },
    setIsRegister: () => { },
    setIsLoggedIn: () => { },
    setUser: () => { },
    setCity: () => { },
    resetAll: () => { },
    setLanguage: () => { }

}
const AppContext = React.createContext<AppContextType | null>(AppContextState)

type Props = {
    children: React.ReactNode;
};

const storedLang = localStorage.getItem('lang');

const AppProvider = ({ children }: Props) => {
    const [isLocationOpen, setIsLocationOpen] = useState<boolean | null>(false)
    const [isLangs, setIsLangs] = useState<boolean | null>(false)
    const [isProfile, setIsProfile] = useState<boolean | null>(false)
    const [isRegister, setIsRegister] = useState<boolean | null>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)
    const [user, setUser] = useState<User | null>(null)
    const [city, setCity] = useState<String | null>("Tbilisi")
    const [language, setLanguage] = useState<string>(storedLang != null? storedLang : "English")
    const resetAll = () => {
        setIsLocationOpen(false)
        setIsLangs(false)
        setIsProfile(false)
        setIsRegister(false)
    }

    useEffect(() => {
        localStorage.setItem('lang', language);
    },[language])
    return (
        <AppContext.Provider
            value={{
                isLocationOpen, setIsLocationOpen, isLangs, setIsLangs, resetAll, isProfile, setIsProfile,
                isRegister, setIsRegister, isLoggedIn, setIsLoggedIn, user, setUser, city, setCity, language, setLanguage
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
