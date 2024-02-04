import axios from 'axios'
import React from 'react'
import "./List.css"


const List = () => {
  
  const [listItems, setListItems] = React.useState([])


  const [enable,setEnable] = React.useState(true)

  const submitVote = async (itemName) => {
    try {
      const Email = localStorage.getItem("user-email")
      const voteData = {
        email: Email,
        itemName: itemName
      }

      const res = await axios.post("http://localhost:2008/vote", voteData)

      if (res.data === "Already voted today")
      {
        alert("You have already voted today.")
      } 
      
      else 
      {
        const votedItem = listItems.find(item => item.itemName === itemName)
        if(votedItem) 
        {
          alert(`Your vote has been added to ${votedItem.itemName}`)
        }
      }
    } 
    
    catch(error) 
    {
      console.log("Error submitting vote:", error)
      alert("Already voted")
    }
  }


  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfastbytimestamp")
    setListItems(res.data)
  }


  React.useEffect(()=>{
    fetchData()
    
  },[])



  React.useEffect(() => {
    const interval = setInterval(()=>{
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinutes = currentTime.getMinutes()
  
      if (currentHour === 20 && currentMinutes <= 59) {
        setEnable(true)
      } else {
        setEnable(false)
      }
    }, 100)

    return ()=> clearInterval(interval)
    },[])

  
  return (
    <div className='container'>
      
      <div className='vote-title'>
      <h3>
  {enable ? "Vote for your favorite Breakfast" : "Time up for voting"}
  <h2>{listItems.length <= 0 &&  "Items List is empty"}</h2>
</h3>

      </div>

    <div className='list-items-container'>
        <ul className='list-items'>{listItems.map((item,index)=>{
          
          return <div className='list-item' key={index}>
            
            <img className='list-img' src={item.image} alt='breakfast item'/>
            
            <div className='votes'>
            <p>{item.itemName}</p>
          <button disabled={!enable} className='vote-button'  
            onClick={()=>submitVote(item.itemName)}>Vote</button>

            
            </div>
          </div>
        })}
        </ul>
      </div>
      
    </div>
  )
}

export default List