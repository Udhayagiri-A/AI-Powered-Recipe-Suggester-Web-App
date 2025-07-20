import React, { useEffect,useState,useContext,useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/style.css';
import profileImage from '../images/profile.png';
import logo from '../images/logo.png';
import UserProfile from './UserProfile';
import { AuthContext } from './Auth';
export const dropd=React.createContext()
export default function Navbar() {
  const datas=useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState();
  const dropdownRef=useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className='navHeader'>
      <div className="logo-container">
        <img src={logo} height={80} width={70} alt="logo" />
        <h1>Flavoura</h1>
      </div>

      <nav className="nav-links">
        <ul>
          {datas.user===null && <li><NavLink to='/register'>Sign Up</NavLink></li>}
          {datas.user===null && <li><NavLink to='/login'>Login</NavLink></li>}
          {<li><NavLink to='/'>Home</NavLink></li>}
          {datas.user!==null && <li><NavLink to='/recipe_request'>Ask Recipe</NavLink></li>}
          {datas.user!==null && <li><NavLink to='/about'>About</NavLink></li>}
        </ul>
          {datas.user !== null && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <img src={profileImage} height={50} width={50} alt="profile" className="profile-img" onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <UserProfile />
                
              </div>
            )}
            </div>
        )}
      </nav>
    </div>
  );
}
