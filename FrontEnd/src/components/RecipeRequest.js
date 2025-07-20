import React, { useContext, useState } from 'react'
import { AuthContext } from './Auth'
import Login from './Login'
import '../CSS/request.css'
import { RecipeContext } from './Recipe'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function RecipeRequest() {
  const recipe=useContext(RecipeContext)
  const datas=useContext(AuthContext)
  const [data,setData]=useState({ingredients:[],meal:"",cuisine:""})
  const [ingredients,setIngredients]=useState([''])
  const navigate=useNavigate()

  const handleChange=(index,value)=>
  {
    const updated=[...ingredients]
    updated[index]=value
    setIngredients(updated)
  }

  const addIngredients=()=>
  {
    const updated=[...ingredients,'']
    setIngredients(updated)
  }

  const removeIngredient=(index)=>{
    const updated=ingredients.filter((_,i)=>i!==index)
    setIngredients(updated)
  }

  const handleChangeData=(e)=>
  {
    const{name,value}=e.target
    setData(prev=>({...prev,[name]:value}))
  }

  const handleSubmit=(e)=>
  {
    e.preventDefault()
      const fullData = {
    ingredients: ingredients,
    meal: data.meal,
    cuisine: data.cuisine
  }
  console.log("geting",fullData)
    recipe.getIngredients(fullData)
    navigate('/recipe_response')
  }

  return (
    <div className='container'>
      {datas.user!== null?(
        <div>
        <form onSubmit={handleSubmit}>
            <div className='text-container'>
              <h1>Enter ingredients that you have </h1>
            </div>
            {ingredients.map((item,index)=>
              (
                <div key={index} className="ingredient-row">
                  <input type='text' value={item} onChange={(e)=>handleChange(index, e.target.value)} required/>
                  {ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(index)} className="remove-btn">Delete</button>
                  )}
                </div>
              )
            )}
            <button type='button' onClick={addIngredients}>Add +</button>

            <div className="dropdown-row">
              <label>Meal Type</label>
              <select name="meal" value={data.meal} onChange={handleChangeData} required>
                 <option value="">Select</option>
                 <option value="Breakfast">Breakfast</option>
                 <option value="Lunch">Lunch</option>
                 <option value="snacks">snacks</option>
                 <option value="Drinks">Drinks</option>
                 <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div className="dropdown-row">
              <label>Cuisine</label>
              <select name="cuisine" value={data.cuisine} onChange={handleChangeData} required>
                <option value="">Select</option>
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
              </select>

            </div>
            <button type='submit'>Get Recipe</button>
          </form>
          <Outlet />
          </div>
      ):(
        <Login/>)
      }
    </div>
  )
}