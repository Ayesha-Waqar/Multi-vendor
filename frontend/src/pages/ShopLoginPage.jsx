import React , {useEffect} from 'react'
import { useSelector } from 'react-redux';
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from 'react-router-dom';


const ShopLoginPage = () => {
  const { isLoading ,isSeller , seller} = useSelector((state)=>state.seller)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isSeller){
      navigate("/dashboard")
    }
  },[isSeller , isLoading])
  return (
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage
