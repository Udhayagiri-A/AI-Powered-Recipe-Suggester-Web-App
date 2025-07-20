import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from './Auth'
import '../CSS/login.css'
import proImg from '../images/profile1.png'
export default function Login() {
  const[formData,setform]=useState({email:"",password:""})
  const[users,setUsers]=useState([])
  const navigate=useNavigate()
  const datas=useContext(AuthContext)
  const handleChange=(e)=>
  {
    const {name,value}=e.target
    setform(prev=>({...prev,[name]:value}))
  }
useEffect(() => {
  axios.get('http://localhost:3000/users')
    .then(res =>{
      console.log(res)
      setUsers(res.data)
    }
    )
    .catch(err => console.log(err));
}, [])

  const handleSubmit=(e)=>
  {
       e.preventDefault()
      const found= users.find(x=> x.email===formData.email && x.password===formData.password)
      if(found)
      {
        datas.login(found)
        navigate('/')
      }
      else{
        navigate('/register')
        alert("No user found , create an account")
      }
  }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className='image-container'>
          <img src={proImg} alt="user" height={60} width={60} />
        </div>
        <label>Email</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} required/>
        <br></br>
        <br></br>
        <br></br>
        <label>Password</label>
        <input type='password' name='password' value={formData.password} onChange={handleChange} required/>
        <br></br>
        <br></br>
        <br></br>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
