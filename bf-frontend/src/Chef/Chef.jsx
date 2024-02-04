import axios from 'axios'
import React from 'react'
import "./Chef.css"


const Chef = () => {

  const [listItems, setListItems] = React.useState([])

  const [enabled,setEnabled] =React.useState(true)

  const [addComment,setAddComment] = React.useState({
    itemName:"",
    comment:""
  })

  const changeHandler = (e)=>{
    setAddComment({...addComment, [e.target.name]: e.target.value})
  }


  const submitHandler = async () => {
    
    try {
      const res = await axios.post("http://localhost:2008/chefcomment", addComment);

    if (res.data === "Item does not exist") {
        alert(res.data);
    } else if (res.data === "already commented") {
        alert(res.data);
    } else {
        setAddComment(res.data);
        setAddComment({ itemName: "", comment: "" });
        alert("Comment added");
    }
    }
    catch(error){
      alert("Error adding comment")
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
  
      if (currentHour === 19 && currentMinutes <= 59) {
        setEnabled(true)
      } else {
        setEnabled(false)
      }
    }, 100)

    return ()=> clearInterval(interval)
    },[])
  
  return (

    <div className='chef'>
    <div className='chef-data'>

    <div className='chef-title'><p >{!enabled ? "Sorry Chef, time up for adding comments" : "Add your comments" }</p></div>
      
      <input type='text' 
      required
      name='itemName'
      value={addComment.itemName}
      onChange={changeHandler}
      placeholder='Item Name'
      hidden={!enabled}
       />

      <textarea 
      required
      name='comment'
      value={addComment.comment}
      onChange={changeHandler}
      placeholder='comment'
      hidden={!enabled}
       />
      <button hidden={!enabled} className="submit" 
        onClick={submitHandler}>Submit</button>
    </div>

    <div className='chef-items'>
    <h2 className='title'>Breakfast Items</h2>
      <hr/>
        <ol className='chef-items-list'>{listItems.map((item,index)=>{
          return <div key={index} className='item-in-chef'>
            
            {item.image && <img className='chef-img' src={item.image} alt={item.itemName} 
            height="180px" width="220px" />}
                  
                  <div className='chef-itemName'>
                  
                  <p>{item.itemName} </p>
                  
                  </div>
          </div>
        })}
        </ol>
      </div>
      </div>

  )
}

export default Chef
