import './App.css';
import { Routes,Route } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import RecipeRequest from './components/RecipeRequest';
import RecipeResponse from './components/RecipeResponse';
import History from './components/History';
import ViewDetails from './components/ViewDetails';
import About from './components/About';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import Recipe from './components/Recipe';
// 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
function App() {
  return (
    <div className="App">
      <Auth>
        <Recipe>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipe_request' element={<RecipeRequest/>}/>
        <Route path='/recipe_response' element={<RecipeResponse/>}/>
        <Route path='/history' element={<History/>}>
          <Route path='/history/recipe' element={<ViewDetails/>}/>
        </Route>
        <Route path='/about' element={<About/>}/>
        
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/logout' element={<UserProfile/>}/>
      </Routes>
      
        </Recipe>
      </Auth>
    </div>
  );
}

export default App;
