import React from 'react'
import "./Login.css"


const Login = () => {

  const [login,setLogin]=React.useState({
    
    email:"",
    password:""
  }) 

  const changeHandler =(e)=>{
    setLogin({...login, [e.target.name]:e.target.value})
  }

  const loginForm = async()=>{
    console.log("login",login)
    let responseData
    await fetch("http://localhost:2008/login",{
      method:"POST",
      headers:{
          Accept: "application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify(login)
    })
    .then((res)=>res.json())
    .then((data)=>{responseData=data})
    if(responseData.success)
    {
      localStorage.setItem("auth-token", responseData.token)
      localStorage.setItem("user-email", login.email)
      alert("Login successful")

      if(login.email === "chef@gmail.com")
      {
        window.location.replace("/chef")
      } else {
        window.location.replace("/items")
      }
    }
    else{
      alert(responseData.errors)
    }
  }

  return (

    <div className='loginform'>
    <h1 className='head'>Login</h1>
    <div className='login-signup-fields'>

       <input type='text' placeholder='email'
       onChange={changeHandler}
       value={login.email} 
       name='email'
       />

       <input type='text' placeholder='password'
       value={login.password}
       onChange={changeHandler} 
       name='password'
       />

    </div>
    <button className='login' onClick={loginForm}>Login</button>
    </div>
    
  )
}

export default Login