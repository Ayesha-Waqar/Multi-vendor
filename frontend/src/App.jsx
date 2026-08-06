import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  SignUp,
  Home,
  ProductDetails,
  Products,
  BestSelling,
  Faq,
  Profile,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
  ShopCreatePage,
  UserActivation,
  SellerActivation,
  ShopLoginPage
} from './routes/Routes'
import CheckOut from "./pages/CheckOut.jsx"
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage"
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import "./app.css"
import { server } from './server';
import Store from './redux/store'
import { loadUser } from './redux/actions/user'
import ScrollToTop from './components/ScrollToTop'
import Events from './components/Events/Events'
import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'


const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    console.log("App mounted");
    Store.dispatch(loadUser());
  }, []);

  return loading ? null : (
    <>
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-activation/:token" element={<UserActivation />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/events" element={<Events showAll />} />
        <Route path="/faq" element={<Faq />} />

        {/* Protected Routes*/}
        <Route path="/profile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated} >
              <Profile />
            </ProtectedRoute>} />

        <Route path="/checkout"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated} >
              <CheckOut />
            </ProtectedRoute>} />

        <Route
          path="/payment"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />

        {/* Shop Routes  */}
        <Route path="/create-shop" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop-activation/:token" element={< SellerActivation/>} />

      </Routes>
    </>
  )
}

export default App
