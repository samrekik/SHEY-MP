import { App, Button, Form, Input } from "antd";
import {useDispatch}from "react-redux"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../components/Divider";
import { RegisterUser } from "../apicalls/users";
import { SetLoader } from "../redux/loadersSlice";

export default function Register() {
    const {message}=App.useApp()
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const handleSubmit =async(value)=>{
       try {
        dispatch(SetLoader(true))
        const response=await RegisterUser(value)
        dispatch(SetLoader(false))
        if (response.success) {
            message.success("User registered successfully");
            navigate('/login')
          } else {
            message.error(response.message || "Registration failed");
          }

        
       } catch (error) {
        dispatch(SetLoader(false))
        message.error(error.message)
       }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/");
        }else {
          setCheckingAuth(false); // ✅ autoriser le rendu du formulaire
        }
      }, [navigate]);
    
      if (checkingAuth) {
        return null; // ou return <div>Loading...</div>;
      }
    return (
        <div className="min-h-screen bg-[#405138] flex justify-center items-center px-4">
          <div className="bg-white p-6 md:p-10 rounded-lg w-full max-w-md shadow-md">
            <div className="text-center">
              <h1 className="text-3xl text-[#405138]">SMP - <span className="text-gray-400">REGISTER</span></h1>
            </div>
            <Divider />
            <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Name" className="h-10" />
              </Form.Item>
      
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
              >
                <Input placeholder="example@email.com" className="h-10" />
              </Form.Item>
      
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter a password" }]}
              >
                <Input.Password className="h-10" />
              </Form.Item>
      
              <Button type="primary" htmlType="submit" block className="mt-2">
                Register
              </Button>
            </Form>
            <div className="text-center mt-5 text-gray-400">
              <span>Already have an account? <Link to={'/login'} className="text-gray-700 hover:text-gray-900">Login</Link></span>
            </div>
          </div>
        </div>
      );
      
}
