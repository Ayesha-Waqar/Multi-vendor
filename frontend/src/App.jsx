import React from 'react'
import { Route, Routes } from 'react-router'
import { Login, SignUp , Activation} from './routes/Routes'
import { Toaster } from "react-hot-toast";
import "./app.css"

const App = () => {
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
