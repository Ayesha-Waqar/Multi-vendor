import React , {useEffect}from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ShopCreate from "../components/Shop/ShopCreate.jsx"
const ShopCreatePage = () => {
   const {isSeller , seller} = useSelector((state)=>state.seller)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isSeller){
      navigate(`/shop/${seller._id}`)
    }
  },[])
  return (
    <div>
      <ShopCreate/>
    </div>
  )
}

export default ShopCreatePage
