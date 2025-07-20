import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/home.css'; 
import { AuthContext } from './Auth';
export default function Home() {
  const datas=useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <div className="home-banner">
      <div className="home-overlay">
        <h1>Create Magical Meals with What You Already Have</h1>
        <button onClick={() => datas.user!==null?navigate("/recipe_request"):navigate('/login')}>Start Cooking</button>
      </div>
    </div>
  );
}
 