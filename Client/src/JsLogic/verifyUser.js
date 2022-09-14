
import axios from "axios";

export const verifyUser = (code) => {
    return axios.get(`https://lim01.herokuapp.com/api/auth/confirm/${code}`).then((response) => {
      return response.data;
    });
  };