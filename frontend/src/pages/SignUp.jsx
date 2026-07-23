import React, { useEffect } from 'react'
import SignupPage from '../components/SignUp/SignupPage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const { isAuthenticated } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            <SignupPage />
        </div>
    )
}

export default SignUp
