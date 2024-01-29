import React from 'react'
import "./Signup.css"



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
  
  
    const signupForm = async()=>{
      let responseData
      await fetch("http://localhost:2008/signup",{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(signup)
      })
      .then((res)=>res.json())
      .then((data)=>{responseData=data})
      
      if(responseData.success)
      {
        localStorage.setItem("auth-token", responseData.token)
        localStorage.setItem("user-email", signup.email)

        window.location.replace("/items")
        alert("signup successful ")
      }
      else{
        alert(responseData.errors)
      }
      
    }
    
  
    return (
  
      <div className='register'>
      <h1 className='heading'>Register</h1>
      <div className='signup-fields'>
  
        <input type='text' placeholder='name'
        value={signup.name} onChange={changeHandler}
        name='name'  />
  
         <input type='text' placeholder='email'
         onChange={changeHandler}
         value={signup.email} 
         name='email'
         />
  
         <input type='text' placeholder='password'
         value={signup.password}
         onChange={changeHandler} 
         name='password'
         />
  
         <input type='text'
         value={signup.cnfmpassword} placeholder='confirm password'
         onChange={changeHandler} 
         name='cnfmpassword'
         />
      
      </div>
      <button className='signup' onClick={signupForm}>Register</button>
  </div>
  )
}

export default Signup

