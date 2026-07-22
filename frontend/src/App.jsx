import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Login, SignUp, Activation, Home, ProductDetails , Products , BestSelling  , Faq} from './routes/Routes'
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import "./app.css"
import { server } from './server';
import Store from './redux/store'
import { loadUser } from './redux/actions/user'
import ScrollToTop from './components/ScrollToTop'
import Events from './components/Events/Events'
import { useSelector } from 'react-redux'

const App = () => {
    const {loading} = useSelector((state)=>state.user)

  useEffect(() => {
  console.log("App mounted");
  Store.dispatch(loadUser());
}, []);

  return  loading ?  null : ( 
    <>
      <Toaster />
      <ScrollToTop/>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/activation/:token" element={<Activation />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/best-selling" element={<BestSelling/>}/>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/events" element={<Events showAll/>}/>
         <Route path="/faq" element={<Faq/>}/>


      </Routes>
    </>
  )
}

export default App
