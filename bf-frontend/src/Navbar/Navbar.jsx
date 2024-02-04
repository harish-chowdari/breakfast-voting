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
        <Link to="/chef"><button className='chef-button'>Chef</button></Link>
        <Link to="/cheflist"><button className='comment-button'>Comments</button></Link>
        </>
         : 
        <>
        <Link to="/items"><button hidden={!isAuthToken} className='items-button'>Items</button></Link> 
        <Link to="/list"><button hidden={!isAuthToken} className='list-button'>List</button></Link>
        </>
        }

        <Link to="/winner"><button className='winner-button'>Winner</button></Link>

        {localStorage.getItem("auth-token")
            ? <button onClick={()=>{localStorage.removeItem("auth-token"); 
            localStorage.removeItem("user-email"); window.location.replace("/")} } className='login-button'>Logout</button>  : 
            
          <Link to="/login">  <button className='login-button'>Login</button></Link> 
        }



        
    
    </div>
  )
}

export default Navbar