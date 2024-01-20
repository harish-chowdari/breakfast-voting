import axios from 'axios'
import React from 'react'
import "./List.css"


const List = () => {

  const [Winner,setWinner] = React.useState(null)

  const [listItems, setListItems] = React.useState([])

  const [vote,setVote] =React.useState({})

  const voteHandler = (itemId)=>{
    setVote((prevVotes) => (
      {
      ...prevVotes,
      [itemId]: (prevVotes[itemId] || 0) + 1
    }
    ))
  }


  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfast")
    setListItems(res.data)
  }

  React.useEffect(()=>{
    fetchData()
     
  },[])

  React.useEffect(() => {

    const delay = setTimeout(() => {
      const maxVotes = Math.max(...Object.values(vote), 0);
      const winningItemId = Object.keys(vote).find((itemId) => vote[itemId] === maxVotes);
      
      setWinner(winningItemId);
    }, 15000)
  
    return () => clearTimeout(delay)
  }, [vote]);

  
  return (
    <div className='container'>
    {listItems.length >=0  ? <h2 className='title'>Items List is empty</h2> : <h2 className='title'>Vote for your favorite breakfast</h2>}
    <div >
        <ul className='list-items'>{listItems.map((item,index)=>{
          return <div className='list-item' key={index}>
            
            <p><strong>{item.itemName}</strong> votes = {vote[item._id] || 0}</p>
            <img src={item.image} width="200px" height="150px" alt='breakfast item'/>
            
            <div className='votes'>
            <p><strong>Item Name :</strong></p>
              {item.itemName}
            
            </div>

            <button onClick={() => voteHandler(item._id)}>vote</button>

          </div>
        })}
        </ul>
      </div>

      <div>
       {listItems.length <=0 ? <></> :
         <h2 className='winner'>Winner : {Winner ? listItems.find(item => item._id === Winner).itemName : 'winner will be announced after 15 seconds'} </h2> }
      </div>

    </div>
  )
}

export default List;