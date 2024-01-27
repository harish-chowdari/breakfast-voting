import axios from 'axios'
import React from 'react'
import "./List.css"


const List = () => {

  
  const [listItems, setListItems] = React.useState([])

  const [votesCount, setVotesCount] = React.useState({})

  const [winner,setWinner] = React.useState("")

  const [enable,setEnable] = React.useState(true)

  const [visible,setVisible] = React.useState(true)

  const [voteDetails,setVoteDetails] =React.useState({
    email:"",
    password:"",
    itemName:""
  })

  const changeHandler = (e)=>{
    setVoteDetails({...voteDetails, [e.target.name]:e.target.value})
  }

  const submitHandler = async () => {
    try {

        const Email = localStorage.getItem("user-email")
        const voteData = {
            email: Email,
            itemName: voteDetails.itemName
        }

        const res = await axios.post("http://localhost:2008/vote", voteData)

        if (res.data === "Already voted today") 
        {
          alert("You have already voted today.")
        } 
         
        else if (res.data === "item does not exist") 
        {
            alert("Item does not exist.")
        } 
        else 
        {
            setVoteDetails({
                itemName: ""
            })
            votesData()
            fetchWinner()

            const votedItem = listItems.find(item => item.itemName === voteDetails.itemName)
            if (votedItem) {
                alert(`Your vote has been added to ${votedItem.itemName}`)
            }        
          }
    } 
    catch (error) {
        console.error("Error submitting vote:", error)
        alert("You have already voted")
    }
}

  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getBreakfastByTimestamp")
    setListItems(res.data)
  }

  const votesData = async()=>{
    const res = await axios.get("http://localhost:2008/getvotescount")
    setVotesCount(res.data)
  }

  const fetchWinner = async()=>{
    const res = await axios.get("http://localhost:2008/getWinner")
    setWinner(res.data.winner)
  }

  React.useEffect(()=>{
    fetchData()
    votesData()
    
  },[])

  React.useEffect(()=>{
    const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinutes = currentTime.getMinutes()
      if(currentHour === 12 && currentMinutes <= 59 )
      {
        setEnable(true)
      }
      else{
        setEnable(false)
      }
  },[])

  React.useEffect(()=>{
    const interval =setInterval(()=>{
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinutes = currentTime.getMinutes()
      if(currentHour === 12 && currentMinutes <= 59 )
      {
        setVisible(true)
        fetchWinner()
      }
      else{
        setVisible(false)
      }
    },1000)
    return ()=> clearInterval(interval)
  },[])

  
  return (
    <div className='container'>
      
      <div className='vote-fields'>
       <h3>{enable ? "Please verify your details and vote" : "Time up for voting" }</h3>

          <input type='text' 
          name='itemName'
          value={voteDetails.itemName}
          onChange={changeHandler}
          disabled={!enable}
          placeholder='Item Name to vote'/>

          <button disabled={!enable}
          onClick={submitHandler}>ADD</button>
      </div>

    {listItems.length <=0  ? <h2 className='title'>Items List is empty</h2> : <h2 className='title'>Breakfast Items List</h2>}
    <div >
        <ul className='list-items'>{listItems.map((item,index)=>{
          const voteCount = votesCount[item.itemName] || 0
          return <div className='list-item' key={index}>
            
            {visible ? <p><strong>{item.itemName}</strong> votes = {voteCount} </p> : <></>}
            <img src={item.image} width="200px" height="150px" alt='breakfast item'/>
            
            <div className='votes'>
            <p><strong>Item Name :</strong></p>
              {item.itemName}
            
            </div>
          </div>
        })}
        </ul>
      </div>
<div className='winner-data'>
<h2 className='winner'>The Winner is :</h2>
<p>{visible ? winner : "winner will be announced at 10 AM"}</p>
</div>
      
    </div>
  )
}

export default List