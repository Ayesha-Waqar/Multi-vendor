import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Categories/Categories'
import BestDeals from '../components/Route/BestDeals/BestDeals'
import FeatureProduct from '../components/Route/FeaturedProduct/FeatureProduct'
import Events from '../components/Events/Events'
import Sponsered from "../components/Route/Sponsered/Sponser.jsx"

const Home = () => {
  return (
    <>
    <Header activeHeading = {1}/>
    <Hero/>
    <Categories/>
    <BestDeals/>
    <Events/>
    <FeatureProduct/>
    <Sponsered/>
    </>
  )
}

export default Home
