import axios from 'axios'
import React from 'react'
import "./Chef.css"
import chef from "../assets/chef.jpg"



const Chef = () => {

  const [listItems, setListItems] = React.useState([])

  const [enabled,setEnabled] =React.useState(true)

  const [addComment,setAddComment] = React.useState({
    itemName:"",
    comment:""
  })

  const [errMsg, setErrMsg] =React.useState("")
  
  const [selectedImage, setSelectedImage] = React.useState(null);
  
  const [showPopup, setShowPopup] = React.useState(false);

  const changeHandler = (e)=>{
    setAddComment({...addComment, [e.target.name]: e.target.value})
    setErrMsg("")
  }


  const submitHandler = async () => {

    if(!addComment.itemName || !addComment.comment)
    {
      setErrMsg("All fields are required")
      return
    }

    try {
      const res = await axios.post("http://localhost:2008/chefcomment", addComment);

    if (res.data === "Item does not exist") 
    {
        setErrMsg(res.data);
    } 
    
    else if(res.data === "already commented") 
    {
        setErrMsg(res.data);
    } 
    
    else {
        setAddComment(res.data);
        setAddComment({ itemName: "", comment: "" });
        alert("Comment added");
    }
  }

    catch(error)
    {
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
  
      if (currentHour === 17 && currentMinutes <= 59) 
      {
        setEnabled(true)
      } 
      
      else 
      {
        setEnabled(false)
      }
    }, 1)

    return ()=> clearInterval(interval)
    },[])


  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    setShowPopup(true);
  }

  const closePopup = () => {
    setSelectedImage(null);
    setShowPopup(false);
  }

  
  return (

    <div className='chef' >
    <div className='chef-div'>
    <p className='chef-title'>{!enabled ? 
        <p className='red-color'>Sorry Chef, time up for adding comments"</p> : "Add your comments" }</p>
</div>
    <div className='chef-data'>

      
        <div className="err-div">
          <input 
              type='text' 
              required
              name='itemName'
              value={addComment.itemName}
              onChange={changeHandler}
              placeholder='Item Name'
              hidden={!enabled}
          /> 
          <p className='err-msg'>{errMsg}</p>
        </div>

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
    <h1 className='bf-chef-title'>Breakfast Items </h1>
     
        <ol className='chef-items-list'>{listItems.map((item,index)=>{
          return <div key={index} className='item-in-chef'>
            
            {
              item.image && 
                <img className='chef-img' 
                  onClick={() => handleImageClick(item.image)}
                  src={item.image} alt={item.itemName} 
                  height="180px" width="220px" 
                />
            }
                  
            <p className='chef-itemName'>{item.itemName} </p>
                         
          </div>
        })}
        </ol>
      </div>

        {showPopup && (
        <div className="chef-popup-overlay" >
          <div className="chef-popup">
            <img src={selectedImage} alt="Popup" className='chef-popup-img' />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      </div>

  )
}

export default Chef
