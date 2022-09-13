// src/api/service.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://long-lime-bat-hose.cyclic.app";


const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${API_URL}/api`
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};


const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const service = {uploadImage}

export default service
