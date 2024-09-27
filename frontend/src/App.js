import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Login from './components/Login/Login';
import About from './components/About/About';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import ErrorPage from './components/Errorpage/Error';
import './App.css';
import Feedback from './components/FeedBack/Feedback';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const token=localStorage.getItem('authToken');
    if(token){
      setIsAuthenticated('true');
    }
  },[])

  const handlelogin=(token)=>{
    localStorage.setItem('authToken',token);
    setIsAuthenticated(true);
  }
  const handlelogout=()=>{
    localStorage.removeItem('authToken');
    setIsAuthenticated(false)
  }
  return (
    <div className='background'>
      <Router>
        <Navbar onlogout={handlelogout} />
        <Routes>
            <Route path='/' element={isAuthenticated ? <Home></Home> : <Login onlogin={handlelogin}></Login>}></Route>
            <Route path='/about' element={isAuthenticated ? <About></About> : <Login onlogin={handlelogin}></Login>}></Route>
            <Route path='/feedback' element={isAuthenticated ? <Feedback></Feedback> : <Login onlogin={handlelogin}></Login>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

