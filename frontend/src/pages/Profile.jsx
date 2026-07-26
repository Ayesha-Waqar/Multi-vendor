import React from 'react'
import Header from '../components/Layout/Header'
import ProfileSideBar from "../components/Profile/ProfileSideBar.jsx"
import ProfileContent from "../components/Profile/ProfileContent.jsx"
const Profile = () => {
  return (
    <>
    <Header/>
    <div>
        <div>
            <ProfileSideBar/>
        </div>
        <div>
           <ProfileContent/>
        </div>
    </div>
    </>
  )
}

export default Profile