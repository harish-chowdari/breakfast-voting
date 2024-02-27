import React from 'react'
import "./Items.css"
import axios from 'axios'
import upload_area from "../assets/upload_area.svg"


const Items = () => {

  const [image,setImage] =React.useState(null)

  const [addItem,setAddItem] = React.useState({
    itemName:"",
    image:""
  })

  const [listItems, setListItems] = React.useState([])

  const [itemCount,setItemCount] =React.useState(0)

  const [enabled,setEnabled] =React.useState(true)

  const [Errormsg, setErrorMsg] =React.useState("")

  const [selectedImage, setSelectedImage] = React.useState(null);
  
  const [showPopup, setShowPopup] = React.useState(false);


  const imageHandler = (e)=>{
    setImage(e.target.files[0])
    setErrorMsg("")
  }

  


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


  React.useEffect(() => {
    const interval = setInterval(()=>{
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      const currentMinutes = currentTime.getMinutes()
  
      if (currentHour === 12 && currentMinutes <= 59) 
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
    

  const changeHandler = (e) =>{
    setAddItem({...addItem, [e.target.name]:e.target.value})
    setErrorMsg("")
  }


  const submitHandler = async () => {

    const userId = localStorage.getItem("user-id")


    if(!addItem.itemName)
    {
      setErrorMsg("Item name is required")
      return
    }

    if(!image)
    {
      setErrorMsg("Image is required")
      return
    }

    if(!userId)
    {
      setErrorMsg("User Id is not found")
      return
    }

    try {
        const formData = new FormData()
        formData.append('product', image)

        const imageResponse = await axios.post('http://localhost:2008/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const userId = localStorage.getItem("user-id")


        const res = await axios.post(`http://localhost:2008/addbreakfast/${userId}`, {
            itemName: String(addItem.itemName),
            image: imageResponse.data.image_url
        })


        if(res.data === "Can't add duplicate item for the current day.") 
        {
            setErrorMsg("Item already exists")
        }

        if(res.data === "You have already Added an item.") 
        {
            setErrorMsg("You've Already added an item")
        }

        else
        {
          localStorage.getItem("user-id")
          setAddItem({ itemName: "", image: null })
          setImage(null)
          fetchData()
          fetchCount()
          alert("Item added")
        } 
    } 
    
    catch(error) 
    {
        console.log(error)
        alert("An error adding breakfast item")
    }
}

    const handleImageClick = (imageURL) => {
      setSelectedImage(imageURL);
      setShowPopup(true);
    }

    const closePopup = () => {
      setSelectedImage(null);
      setShowPopup(false);
    }
 


return (
    <div className='container'>

      <div className='item-div'>
          <p className='menu-title'>{itemCount > 9 ? <p >Sorry, the items list is currently full</p>: 
              enabled ? <p className='add-item'>Add an Item</p> : <p>Sorry, time up for adding items</p>}</p>
      </div> 

    <div className='menu' >
        <input type='text' name='itemName'
          value={addItem.itemName}
          onChange={changeHandler}
          placeholder='Breakfast Name'
          hidden={itemCount > 9 || !enabled}
          required
           />

    {Errormsg && <p className='item-error'>{Errormsg}</p>}

      <label htmlFor='file-input'>
          <img hidden={itemCount > 9 || !enabled}
            src={image ? URL.createObjectURL(image) : upload_area} alt='' />
      </label>
          <input disabled={!enabled} hidden type='file' 
              name='image' id='file-input'  onChange={imageHandler} />

        <button className='menu-button' hidden={itemCount > 9 || !enabled} 
            onClick={submitHandler} >ADD</button>
    </div>


        <div className='user-items'>
          <h1 className='bf-title'>Breakfast Items</h1>
          
            <ol className='user-items-list'>{listItems.map((item,index)=>{
              return <div key={index} className='item-in-user'>
                
                {item.image && <img className='user-img'
                  onClick={() => handleImageClick(item.image)} 
                  src={item.image} alt={item.itemName} 
                      />}
                      
                  <p className='user-itemName'>{item.itemName} </p>

              </div>
            })}
            </ol>
          </div>  
      
          {showPopup && (
        <div className="item-popup-overlay" >
          <div className="item-popup">
            <img src={selectedImage} alt="Popup" className='item-popup-img' />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Items