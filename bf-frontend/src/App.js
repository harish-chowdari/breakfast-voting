import React from 'react'
import Items from './Items/Items'
import Navbar from './Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login/Login.jsx'
import List from './List/List.jsx'
import Welcome from './Welcome/Welcome.jsx'
import Signup from './Signup/Signup.jsx'
import Chef from './Chef/Chef.jsx'
import ChefList from './ChefList/ChefList.jsx'
import Winner from './Winner/Winner.jsx'


const App = () => {
  const authToken = localStorage.getItem('auth-token');

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
        {localStorage.getItem("user-email") === "chef@gmail.com" ? 
          
          (
          <>
          <Route path='/chef' element={<Chef/>} />
          <Route path='/cheflist' element={<ChefList/>}  />
          </>
          )
          
          : 
          
          (
            
             authToken &&
             <>
            
            <Route path="/items" element={<Items />} />
            <Route path="/list" element={<List />} />
            </> 
            
          )}          

          <Route path="/login" element={<Login />} />

          <Route path='/signup' element={<Signup/>} />

          <Route path='/winner' element={<Winner/>} />
          <Route path="/" element={<Welcome/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
