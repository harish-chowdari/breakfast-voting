import React from 'react'
import "./ChefList.css"
import axios from 'axios'


const ChefList = () => {

    const [getComments,setGetComments] = React.useState([])

    const fetchComments = async()=>{
      const res = await axios.get("http://localhost:2008/getcomments")
      setGetComments(res.data)
    }

    React.useEffect(()=>{
        fetchComments()
    })


  return (
    <div className='comments-container'>
        <ol >{getComments.map((item,i)=>{
          return <div >
            <div className='comments-list'>

            <li className='item-name'>
            <h3>ItemName: </h3>
            <p className='comment-text'>{item.itemName}</p>
            </li>
            
            <li className='chef-comment-list'>
            <h3>Comment: </h3>
            <p className='comment-text'>{item.comment}</p>
            </li>

            </div>
          
          </div>
          
        })}
        
        
        </ol>
        
    </div>
  )
}

export default ChefList