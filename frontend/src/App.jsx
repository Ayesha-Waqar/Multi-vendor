import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Login, SignUp , Activation} from './routes/Routes'
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import "./app.css"
import { server } from './server';

const App = () => {
  useEffect(() => {
    axios
      .get(`${server}/user/get-user`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message)
        console.log("get user req")
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response?.data?.message || 'Something went wrong')
      })
  }, [])
  
  return (
    <>
<Toaster />
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp/>} />
<Route path="/activation/:token" element={<Activation/>}/>    </Routes>
    </>
  )
}

export default App
