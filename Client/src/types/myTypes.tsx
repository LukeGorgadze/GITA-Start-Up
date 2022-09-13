type User = {
    username:String,
    mail:String,
}

type AppContextType = {
    isLocationOpen: boolean | null;
    isLangs: boolean | null;
    isProfile: boolean | null;
    isRegister: boolean | null;
    isLoggedIn: boolean | null;
    user: User | null;
    city:String | null,
    language: string ,
    setIsLocationOpen: React.Dispatch<React.SetStateAction<boolean | null>>,
    setIsLangs: React.Dispatch<React.SetStateAction<boolean | null>>,
    setIsProfile: React.Dispatch<React.SetStateAction<boolean | null>>,
    setIsRegister: React.Dispatch<React.SetStateAction<boolean | null>>,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setCity: React.Dispatch<React.SetStateAction<String | null>>,
    setLanguage:React.Dispatch<React.SetStateAction<string>>,
    resetAll: Function,
}
export type {User,AppContextType}