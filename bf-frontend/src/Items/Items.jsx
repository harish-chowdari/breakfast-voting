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


  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfast")
    setListItems(res.data)
  }

  React.useEffect(()=>{
    fetchData()
     
  },[])

  const changeHandler = (e) =>{
    setAddItem({...addItem, [e.target.name]:e.target.value})
  }

  const senReq = async()=>{

    const formData = new FormData();
    formData.append('product', image);

    const imageResponse = await axios.post('http://localhost:2008/upload', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data' 
      }
    })

    return await axios.post("http://localhost:2008/addbreakfast",{
      itemName:String(addItem.itemName),
      image: imageResponse.data.image_url
    })
    .then(res=>res.data)
  }

  const isWordAlreadyPresent = listItems.some(
    (item) => item.itemName.toLowerCase() === addItem.itemName.toLowerCase()
  );

  const submitHandler = async(e)=>{
    console.log(addItem)
    if(listItems.length<=10 && !isWordAlreadyPresent)
    {
      await senReq()
      setAddItem({ itemName: "",image: null })
      setImage(null)
      fetchData()
    }
    else{
      alert("Item is already added or items limit exceeded")
    }
    
  }


  return (
    <div className='container'>
    <div className='menu'>
        <input type='text' name='itemName'
          value={addItem.itemName}
          onChange={changeHandler}
          placeholder='Enter Breakfast Name' 
          disabled={listItems.length>=10}
           />

<label htmlFor='file-input'>
  <img src={image ? URL.createObjectURL(image) : upload_area} alt='' width="80px" />
</label>
<input  type='file' name='image' disabled={listItems.length>=10} id='file-input' hidden onChange={imageHandler} />


        <button onClick={submitHandler} disabled={listItems.length>=10}>ADD</button>
    </div>

    <div >
        <ol className='items'>{listItems.map((item,index)=>{
          return <div key={index} className='item'>
            <li>{item.itemName}</li>
            {item.image && <img  src={item.image} alt={item.itemName} height="180px" width="220px" />}
          </div>
        })}
        </ol>
      </div>

    </div>
  )
}

export default Items