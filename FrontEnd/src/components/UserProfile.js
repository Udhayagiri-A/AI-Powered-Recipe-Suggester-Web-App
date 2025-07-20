import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import { useNavigate } from 'react-router-dom'
export default function Logout() {
    const datas=useContext(AuthContext)
    const navigate=useNavigate()
    function handleProfile()
    {
      navigate('/profile')
    }
    function handlelogout()
    {
        datas.logout()
        navigate('/')
    }
  return (
    <div>
        <button onClick={handlelogout}>Logout</button>
        <button onClick={handleProfile}>User Profile</button>
    </div>
  )
}
