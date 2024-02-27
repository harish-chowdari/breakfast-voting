import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


const Navbar = () => {

  const isAuthToken = localStorage.getItem('auth-token');

  return (
    <div className='navbar'>
        
        {
          localStorage.getItem("user-email") === "chef@gmail.com" ? 
        <>
          <div className='links'>
            <Link className='link' to="/chef">Chef</Link>
            <Link className='link' to='/cheflist'>Comments</Link>
          </div>
        </>
         : 
        <>
          <div className='links'>
            {isAuthToken && <Link className='link' to='/items'>Items</Link>}
            {isAuthToken && <Link className='link' to='/list'>Vote</Link>}
          </div>
        </>
        
        }
        <div className='login-links'>
          <Link className='link' to="/winner"> Winner</Link>

          {localStorage.getItem("auth-token")
              ? <button onClick={()=>{localStorage.removeItem("auth-token"); 
              localStorage.removeItem("user-id"); localStorage.removeItem("user-email"); window.location.replace("/")} } className='login-button'>Logout</button>  : 
              
            <Link to="/login">  <button className='login-button'>Login</button></Link> 
          }
        </div>
    </div>
  )
}

export default Navbar