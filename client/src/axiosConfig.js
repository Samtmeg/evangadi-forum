import axios from "axios"

const axiosInstance = axios.create({
    // baseURL:"http://localhost:5500/api"
    baseURL:"https://evangadi-forum-8dnu.onrender.com"}
)

export default axiosInstance;