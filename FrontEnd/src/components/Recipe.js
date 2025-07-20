import React, { useContext, useState } from 'react'
import { AuthContext } from './Auth'
import axios from 'axios'
export const RecipeContext=React.createContext()
export default function Recipe(props) {
  const [ingredient,setIngredients]=useState({ingredients:[],meal:"",cuisine:""})
  const {user}=useContext(AuthContext)
  const getIngredients=(ingredient)=>
  {
    setIngredients(ingredient)

    if(user && user.id)
    {
      axios.patch(`http://localhost:3000/users/${user.id}`,{
        recipe:ingredient
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
    }
  }



  return (
    <div>
      <RecipeContext.Provider value={{getIngredients,ingredient}}>
        {props.children}
      </RecipeContext.Provider>
    </div>
  )
}
