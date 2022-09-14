
import axios from "axios";
import { axiosInstance } from "../config";

export const verifyUser = (code) => {
    return axiosInstance.get(`/api/auth/confirm/${code}`).then((response) => {
      return response.data;
    });
  };