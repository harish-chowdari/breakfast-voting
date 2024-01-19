import axios from 'axios'
import React from 'react'
import "./Chef.css"


const Chef = () => {

  
  const [listItems, setListItems] = React.useState([])
   
  const [com,setcom]=React.useState({
    comment:""
  })

  const changeHandler =(e)=>{
      setcom({...com, [e.target.name]:e.target.value})
  }

  const submitHandler =()=>{
    console.log(com)
  }
  


  const fetchData = async()=>{
    const res = await axios.get("http://localhost:2008/getbreakfast")
    setListItems(res.data)
  }

  React.useEffect(()=>{
    fetchData()
     
  },[])

  

  
  return (
    <div className='container'>
    
    <div >
        <ul className='chef-items'>{listItems.map((item,index)=>{
          return <div className='chef-item' key={index}>
          
            
            {item.itemName}
            <img src={item.image} width="200px" 
            height="150px" alt='breakfast item'/>
            
            <input type='text' 
            name='comment'
            value={com.comment}
            onChange={changeHandler}
            placeholder='comment' />
            <button onClick={submitHandler} className='submit'>submit</button>
            
          </div>
        })}
        </ul>
      </div>


    </div>
  )
}

export default Chef;
