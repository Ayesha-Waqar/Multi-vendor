import React , {useEffect} from 'react'
import { useSelector } from 'react-redux';
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from 'react-router-dom';


const ShopLoginPage = () => {
  const {isSeller , seller} = useSelector((state)=>state.seller)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isSeller){
      navigate(`/shop/${seller._id}`)
    }
  },[])
  return (
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage
