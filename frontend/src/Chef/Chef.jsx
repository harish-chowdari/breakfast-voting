import axios from 'axios'
import React from 'react'
import "./Chef.css"


const Chef = () => {

  
  const [listItems, setListItems] = React.useState([])
   
  

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
            
            <textarea placeholder='comment'> </textarea>
            <button className='submit'>submit</button>
            
          </div>
        })}
        </ul>
      </div>


    </div>
  )
}

export default Chef;
