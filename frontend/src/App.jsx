import React from 'react'
import { Route, Routes } from 'react-router'
import { Login, SignUp } from './routes/Routes'
import "./app.css"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp/>} />
    </Routes>
    </>
  )
}

export default App
