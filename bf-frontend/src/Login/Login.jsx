import React from 'react'
import "./Login.css"
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {

  const [loginDetails,setLoginDetails]=React.useState({
    
    email:"",
    password:""
  }) 

  const [ErrorMessage, setErrorMessage] =React.useState("")

  const changeHandler =(e)=>{
    setLoginDetails({...loginDetails, [e.target.name]:e.target.value})
    setErrorMessage("")
  }

  const loginForm = async () => {

    if (!loginDetails.email || !loginDetails.password) 
    {
      setErrorMessage('All fields are required')
      return
    }

    try {
      const res = await axios.post('http://localhost:2008/login', loginDetails);

      if(res.data.success) 
      {
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('user-email', loginDetails.email);
        localStorage.setItem('user-id', res.data.userId);

        alert('Login successful')

        if(loginDetails.email === 'chef@gmail.com') {
          window.location.replace('/chef')
        } 
        
        else {
          window.location.replace('/items')
        }
      } 
      
      else {

        if (res.data === "please signup user not exist") 
        {
          setErrorMessage("User does not exist. Please sign up.")
        } 
        
        else if (res.data === 'wrong password') 
        {
          setErrorMessage('Incorrect password. Please try again.')
        } 
        
        else {
          setErrorMessage('An error occurred during login')
        }
      }
    } 
    
    catch (error) {
      console.error('Error:', error)
      alert('An error occurred during login')
    }
  }

  return (

    <div className='loginform'>
        <h1 className='login-title'>Login Form</h1>
            <div className='login-signup-fields'>

                <input type='text' placeholder='email'
                onChange={changeHandler}
                value={loginDetails.email} 
                name='email'
                autoComplete="off"
                />

                <input type='password' placeholder='password'
                value={loginDetails.password}
                onChange={changeHandler} 
                name='password'
                />

                
                { ErrorMessage && 
                  <p className='error-message'>{ErrorMessage}</p>
                }
                <button className='login' onClick={loginForm}>Login</button>

            </div>
            
              <div className='login-footer'>
                  <p>Not a member ? <span className='login-span'>        
                  <Link to="/signup" className='login-signup'>SignUp</Link> now </span></p>
              </div>
              
    </div>
    
  )
}

export default Login