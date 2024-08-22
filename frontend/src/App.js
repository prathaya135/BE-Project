import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Login from './components/Login/Login';
import About from './components/About/About';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import ErrorPage from './components/Errorpage/Error';
import './App.css';
import { useState } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className='background'>
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={isAuthenticated ? <Home></Home> : <Login></Login>}></Route>
            <Route path='/about' element={isAuthenticated ? <About></About> : <Login></Login>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='*' element={<ErrorPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

