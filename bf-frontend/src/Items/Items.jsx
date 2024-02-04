import React from 'react'
import "./Items.css"
import axios from 'axios'
import upload_area from "../assets/upload_area.svg"


const Items = () => {

  const [image,setImage] =React.useState(false)

  const imageHandler = (e)=>{
    setImage(e.target.files[0])
  }

  const [addItem,setAddItem] = React.useState({
    itemName:"",
    image:""
  })

  const [listItems, setListItems] = React.useState([])

  const [itemCount,setItemCount] =React.useState(0)

  const [enabled,setEnabled] =React.useState(true)

  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfastbytimestamp")
    setListItems(res.data)
  }

  const fetchCount = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfastitemcount")
    setItemCount(res.data.count)
  } 

  

  React.useEffect(()=>{
    fetchData()
    fetchCount()
  },[])

  const changeHandler = (e) =>{
    setAddItem({...addItem, [e.target.name]:e.target.value})
  }



  const submitHandler = async () => {
    try {
        const formData = new FormData()
        formData.append('product', image)

        const imageResponse = await axios.post('http://localhost:2008/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const res = await axios.post("http://localhost:2008/addbreakfast", {
            itemName: String(addItem.itemName),
            image: imageResponse.data.image_url
        })


        if(res.data === "Can't add duplicate item for the current day.") 
        {
            alert("Item already exists")
        }

        else
        {
        setAddItem({ itemName: "", image: null })
        setImage(null)
        fetchData()
        fetchCount()
        } 
    } 
    
    catch(error) 
    {
        console.log(error)
        alert("An error adding breakfast item")
    }
}


  React.useEffect(() => {
    const interval = setInterval(()=>{
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinutes = currentTime.getMinutes()
  
      if (currentHour === 18 && currentMinutes <= 59) {
        setEnabled(true)
      } else {
        setEnabled(false)
      }
    }, 1000)

    return ()=> clearInterval(interval)
    },[])

     



return (
    <div className='container'>
    
    <div className='menu' >

    <p className='menu-title'>{itemCount > 9 ? <p >Sorry, the items list is currently full.</p>: 
        enabled ? <></> : <p>Sorry time up for adding items</p>}</p>
        
        <input type='text' name='itemName'
          value={addItem.itemName}
          onChange={changeHandler}
          placeholder='Enter Breakfast Name'
          
          hidden={itemCount > 9 || !enabled}
          required
           />

      <label htmlFor='file-input'>
        <img hidden={itemCount > 9 || !enabled}
        
         src={image ? URL.createObjectURL(image) : upload_area} alt='' width="80px" />
      </label>
      <input disabled={!enabled} type='file' name='image' id='file-input' hidden onChange={imageHandler} />

        <button className='menu-button' hidden={itemCount > 9 || !enabled} onClick={submitHandler} >ADD</button>
    </div>


    <div className='user-items'>
    <h2 className='title'>Breakfast Items</h2>
      <hr/>
        <ol className='user-items-list'>{listItems.map((item,index)=>{
          return <div key={index} className='item-in-user'>
            
            {item.image && <img className='user-img' src={item.image} alt={item.itemName} 
            height="180px" width="220px" />}
                  
                  <div className='user-itemName'>
                  
                  <p>{item.itemName} </p>
                  
                  </div>
          </div>
        })}
        </ol>
      </div>  
      
    </div>
  )
}

export default Items