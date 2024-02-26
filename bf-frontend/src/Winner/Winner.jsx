import React from 'react'
import "./Winner.css"

import axios from 'axios'

const Popup = ({popUpMsg, handleClick})=>{
  return(
    <div className='popup-container'>
      <div className='pop-content'>
          <p>{popUpMsg}</p>
          <button onClick={handleClick} >Close</button>
      </div>
    </div>
  )

}


const Winner = () => {

    const [popUpMsg,setPopUpMsg] = React.useState("")

    const [showPopup,setShowPopup] = React.useState(false)


        React.useEffect(()=>{
          let timeOut
          if(showPopup)
           
          {
            timeOut = setTimeout(() => 
            {
              setShowPopup(false)
            }, 5000);
          }

          return () => {
            clearTimeout(timeOut)
          }
        }, [showPopup])


  
  const fetchWinner = async()=>{
    try 
    {
      const res = await axios.get("http://localhost:2008/getwinner")
      
      if(res.data.winner)
      {
        setPopUpMsg("The winner is " + res.data.winner)
        setShowPopup(true)
      }

      else
      {
        setPopUpMsg("The winner will be declared at 10 PM")
        setShowPopup(true)
      }

      
    }
    
    catch(error)
    {
      alert("An error occurred while fetching winner")
    }

  }

  const clickHandle = () =>{
    setShowPopup(false)
  }
  
  
    return (
      <div className='winner-container'>
      
          <div className='winner-data'>
          
            <button onClick={fetchWinner} 
                className='get-winner-button'>Get Winner</button>
                      
          </div>   

          {showPopup && <Popup popUpMsg = {popUpMsg} 
            handleClick = {clickHandle}
            />}
  
      </div>
    )
}

export default Winner