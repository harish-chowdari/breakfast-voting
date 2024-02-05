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
      
  {enable ? <p className='vote-bf'>Vote for your favorite Breakfast</p> : <p className='timup-title'>Sorry, time up for voting</p>}
  <h2>{listItems.length <= 0 &&  "Items List is empty"}</h2>


      </div>

      <div className='list-items'>

        <ol className='list-items-list'>{listItems.map((item,index)=>{
          return <div key={index} className='item-in-list'>
            
            <img className='list-img' 
            
               src={item.image} alt={item.itemName} 
             />
                  
            <p className='list-itemName'>{item.itemName} </p>
            <button disabled={!enable} onClick={()=>submitVote(item.itemName)} className='vote-button'>Vote</button>
          </div>
        })}
        </ol>
      </div>  
      
    </div>
  )
}

export default List