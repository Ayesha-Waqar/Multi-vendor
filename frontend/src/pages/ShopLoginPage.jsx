import React , {useEffect} from 'react'
import { useSelector } from 'react-redux';
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from 'react-router-dom';


const ShopLoginPage = () => {
  // const {isAuthenticated} = useSelector((state)=>state.user)
  // const navigate = useNavigate()

  // useEffect(()=>{
  //   if(isAuthenticated){
  //     navigate("/")
  //   }
  // },[])
  return (
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage
