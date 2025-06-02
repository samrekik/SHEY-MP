import React, { useEffect } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector}from "react-redux"
import { CurrentUser } from "../apicalls/users";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
export default function ProtectedPage({ children }) {
  const {user}=useSelector((state)=>state.users)
  const { message } = App.useApp();
  const dispatch=useDispatch()
  
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
    dispatch(SetLoader(true))
      const response = await CurrentUser();
      dispatch(SetLoader(false))
      if (response.success) {
       dispatch(SetUser(response.data))
        console.log(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
      navigate("/login");
      message.error(error.message || "Unauthorized");
    } 
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  
  return (
    user && (
      <div>
        <div className="flex justify-between items-center bg-[#405138] p-5 mb-5">
          <h1 className="text-2xl text-white cursor-pointer"onClick={()=>navigate('/')}>SHEY MP</h1> 
          <div className="bg-white text-[16px] py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-shield-user-line"></i>
            <span className="underline cursor-pointer "onClick={()=>
              {
                if(user.role==='user'){
                navigate('/profile')}
                else{
                  navigate('/admin')
                }
              }}>{user.name}</span>
            <i className="ri-logout-box-r-line ml-10 cursor-pointer"onClick={()=>{
              localStorage.removeItem("token")
              navigate('/login')
            }}></i>
          </div>
        </div> 
        {children}
      </div>
    )
  );
}
