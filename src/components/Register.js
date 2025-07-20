import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../CSS/register.css'
import { AuthContext } from './Auth'
export default function Register() {
  const[formData,setform]=useState({name:"",email:"",password:""})
  const[user,setUser]=useState([])
  const navigate=useNavigate()
  const datas=useContext(AuthContext)
  useEffect(()=>
  {
    axios.get('http://localhost:3000/users')
    .then(res=>{
      setUser(res.data)
    })
    .catch(err=>console.log(err))
  })

  const handleChange=(e)=>
  {
    const {name,value}=e.target
    setform(prev=>({...prev,[name]:value}))
  }

  const handleSubmit=(e)=>
  {
    const found=user.find(x=> x.email===formData.email)
    if(found)
    {
      alert("Email is already exist, try login")
    }
    else
    {
      e.preventDefault()
      const userData={...formData, recipe: [{ingredients: [],meal: "",cuisine: ""}]}
      axios.post('http://localhost:3000/users',userData)
      .then(res=>{
        alert("Account created successfully")
        datas.login(res.data)
        navigate('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }

  }
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' name='name' value={formData.name} onChange={handleChange} required/>
        <br></br>
        <br></br>
        <br></br>
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
        <button type='submit'>Sign up</button>
      </form>
    </div>
  )
}
