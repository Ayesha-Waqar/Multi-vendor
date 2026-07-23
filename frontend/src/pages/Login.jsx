import React , {useEffect} from 'react'
import { useSelector } from 'react-redux';
import LoginPage from "../components/Login/LoginPage.jsx";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const {isAuthenticated} = useSelector((state)=>state.user)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  },[])
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default Login
