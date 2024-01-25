import React from 'react'
import Items from './Items/Items'
import Navbar from './Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login/Login.jsx'
import List from './List/List.jsx'
import Signup from './Signup/Signup.jsx'
import Welcome from './Welcome/Welcome.jsx'


const App = () => {
  const authToken = localStorage.getItem('auth-token');

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {authToken ? (
            <Route path="/list" element={<List />} />
          ) : (
            <Route path="/list" element={<Login/>} />
          )}

          <Route path="/" element={<Welcome/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
