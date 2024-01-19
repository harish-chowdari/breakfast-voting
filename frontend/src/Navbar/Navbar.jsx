import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


const Navbar = () => {

  const isAuthTokenPresent = localStorage.getItem('auth-token');

  return (
    <div className='navbar'>
        <Link to="/items"><button>Items</button></Link>

        <Link to="/chef"><button>Chef</button></Link>

         {localStorage.getItem("auth-token")
            ? <button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")} }>Logout</button>: 
            <Link to="/login">  <button>Login</button></Link> }


        <Link to="/signup"><button>Signup</button></Link>

        <Link to="/list"><button hidden={!isAuthTokenPresent}>List</button></Link>
    </div>
  )
}

export default Navbar