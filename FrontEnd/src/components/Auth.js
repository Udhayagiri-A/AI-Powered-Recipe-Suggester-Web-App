import React,{useState} from 'react'
export const AuthContext = React.createContext()
export default function Auth(props) {
    const[user,setUser]=useState(()=>
    {
      const savedUser = localStorage.getItem('flavoura-user')
      return savedUser ? JSON.parse(savedUser) : null
    })
    const login=((userData)=>{
        localStorage.setItem('flavoura-user', JSON.stringify(userData));
        setUser(userData);
    })
    const logout=(()=>{
        localStorage.removeItem('flavoura-user')
        setUser(null)
        
})
  return (
    <div>
      <AuthContext.Provider value={{user,login,logout}}>
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}
