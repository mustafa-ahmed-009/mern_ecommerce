import axios  from "axios"
export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/", 
    timeout: 10000,
    withCredentials: true, // used for including creadentails like (cookies, auth headers , TLS client certificates )
})