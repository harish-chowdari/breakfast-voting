import React from 'react'
import "./Winner.css"

import axios from 'axios'


const Winner = () => {
  
    const [winner,setWinner] = React.useState()
  
    const [visible,setVisible] = React.useState(true)
  
  
      React.useEffect(() => {
        const interval = setInterval(()=>{
          const currentTime = new Date()
          const currentHour = currentTime.getHours()
          const currentMinutes = currentTime.getMinutes()
      
          if (currentHour === 22 && currentMinutes <= 59) {
            setVisible(true)
            
          } else {
            setVisible(false)
          }
        }, 1000)
    
        return ()=> clearInterval(interval)
        },[])
    
  

  
  

  
  const fetchWinner = async()=>{
    try 
    {
      const res = await axios.get("http://localhost:2008/getwinner")
      setWinner(res.data.winner)
    }
    
  catch(error)
  {
    alert("An error occurred while fetching winner")
  }

  }

  
  
    return (
      <div className='winner-container'>
      
      <div className='winner-data'>
       
        <button disabled={!visible} onClick={fetchWinner} 
        className='get-winner-button'>Get Winner</button>
        
       <span>{winner}</span>
      </div>        
  
      </div>
    )
}

export default Winner