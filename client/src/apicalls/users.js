import { axiosInstance } from "./axiosInstance"
//register user
export const RegisterUser=async(payload)=>{
    try {
        const response=await axiosInstance.post('/users/register',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}
//login user
export const LoginUser=async(payload)=>{
    try {
        const response=await axiosInstance.post('/users/login',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}
//get current user
export const CurrentUser=async()=>{
    try {
        const response=await axiosInstance.get('/users/get-current-user')
        return response.data
    } catch (error) {
        return error.message
    }
}