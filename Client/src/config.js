import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://lim01.herokuapp.com/"
})