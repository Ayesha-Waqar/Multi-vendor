import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Login, SignUp , Activation , Home} from './routes/Routes'
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import "./app.css"
import { server } from './server';
import Store from './redux/store'
import { loadUser } from './redux/actions/user'

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser())
  }, [])
  
  return (
    <>
<Toaster />
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp/>} />
<Route path="/activation/:token" element={<Activation/>}/>
 <Route path="/" element={<Home/>} />
 
   </Routes>
    </>
  )
}

export default App
