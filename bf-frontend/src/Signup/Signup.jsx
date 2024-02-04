import React from 'react'
import "./Signup.css"
import axios from 'axios';
import { Link } from "react-router-dom";



const Signup = () => {
 
    const [signup,setSignup]=React.useState({
      name:"",
      email:"",
      password:"",
      cnfmpassword:""
    }) 
  
    const changeHandler =(e)=>{
        setSignup({...signup, [e.target.name]:e.target.value})
    }
  
  
  
  const signupForm = async () => {
  try {
    const response = await axios.post("http://localhost:2008/signup", signup);

    if (response.data.success) {
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("user-email", signup.email);
      alert("Signup successful");
      window.location.replace("/items");
    } 

    else if(response.data === "user already exist")
    {
      alert("User Exist")
    }

    else if(response.data === "Passwords are not matched")
    {
      alert("Passwords are not matched")
    }

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during signup");
  }
}

    
  
    return (
  
      <div className='signup-form'>
      <h1 className='signup-title'>Signup Form</h1>
      <div className='signup-fields'>
  
        <input type='text' placeholder='name'
        value={signup.name} onChange={changeHandler}
        name='name'  />
  
         <input type='email' placeholder='email'
         onChange={changeHandler}
         value={signup.email} 
         name='email'
         />
  
         <input type='password' placeholder='password'
         value={signup.password}
         onChange={changeHandler} 
         name='password'
         />
  
         <input type='password'
         value={signup.cnfmpassword} placeholder='confirm password'
         onChange={changeHandler} 
         name='cnfmpassword'
         />
            
          <button className='signup' onClick={signupForm}>Signup</button>
      
      <div className='signup-footer'>
      <p>Already a member ?<span><Link to="/login" className='signup-login'>  Login</Link> </span>now</p>

      </div>
      </div>
  </div>
  )
}

export default Signup

