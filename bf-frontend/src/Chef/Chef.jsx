import axios from 'axios'
import React from 'react'
import "./Chef.css"


const Chef = () => {

  const [listItems, setListItems] = React.useState([])

  const [addComment,setAddComment] = React.useState({
    itemName:"",
    comment:""
  })

  const changeHandler = (e)=>{
    setAddComment({...addComment, [e.target.name]: e.target.value})
  }

  const submitHandler = async()=>{
  
    const res = await axios.post("http://localhost:2008/chefcomment",addComment)
    if(res.data === "Item does not exist")
    {
      alert(res.data)
    }

    else if(res.data === "already commented")
    {
      alert(res.data)
    } 

    else
    {
      setAddComment(res.data)
      setAddComment({itemName:"", comment:""})
      alert("Comment added")
    }
  }


  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfastbytimestamp")
    setListItems(res.data)
  }

  React.useEffect(()=>{
    fetchData()
    
  },[])
  
  return (

    <div className='chef'>
    <div className='chef-data'>
      <input type='text' 
      name='itemName'
      value={addComment.itemName}
      onChange={changeHandler}
      placeholder='Item Name'/>

      <textarea 
      name='comment'
      value={addComment.comment}
      onChange={changeHandler}
      placeholder='comment' />
      <button className="submit" onClick={submitHandler}>Submit</button>
    </div>

    <div className='chef-items'>
    <h2 className='title'>Breakfast Items</h2>
        <ol className='chef-items-list'>{listItems.map((item,index)=>{
          return <div key={index} className='item-in-chef'>
            <li className='chef-itemName'><strong>ItemName : </strong><p>{item.itemName}</p></li>
            
            {item.image && <img className='chef-img' src={item.image} alt={item.itemName} />}
          </div>
        })}
        </ol>
      </div> 
      </div>

  )
}

export default Chef
