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

    const [ErrorMessage, setErrorMessage] =React.useState("")

  
    const changeHandler =(e)=>{
        setSignup({...signup, [e.target.name]:e.target.value})
      setErrorMessage("")
      }

      const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
  
  
  
  const signupForm = async () => {

    if (!signup.name || !signup.email || !signup.password || !signup.cnfmpassword) 
    {
      setErrorMessage('All fields are required')
      return
    }

    if(!isEmailValid(signup.email))
    {
      setErrorMessage('Enter a valid email')
      return
    }

    if(signup.password.length < 8)
    {
      setErrorMessage('password must be 8 characters')
      return
    }



  try {
    const response = await axios.post("http://localhost:2008/signup", signup);

    if (response.data.success) 
    {
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("user-id", response.data.userId);
      alert("Signup successful");
      window.location.replace("/items");
    } 

    else if(response.data === "user already exist")
    {
      setErrorMessage("User Already Exist")
    }

    else if(response.data === "Passwords are not matched")
    {
      setErrorMessage("Passwords are not matched")
    }

  } 
  
  catch(error) 
  {
    console.error("Error:", error)
    alert("An error occurred during signup")
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
      

          <div>
            {ErrorMessage && <p className='error-signup'>{ErrorMessage}</p>}
              <button className='signup' onClick={signupForm}>Signup</button>

              <div className='signup-footer'>
                <p>Already a member? <span className='signup-span'>        
                  <Link to="/login" className='signup-login'>Login</Link> now </span></p>
              </div>
          </div>

        </div>
      </div>
  )
}

export default Signup

