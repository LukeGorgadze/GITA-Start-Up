
import axios from "axios";

export const verifyUser = (code) => {
    return axios.get(`http://localhost:5000/api/auth/confirm/${code}`).then((response) => {
      return response.data;
    });
  };