import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Create = () => {

   const [title, setTitle] = useState('');
   const [author, setAuthor] = useState('');
   const [body, setBody] = useState('')

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault()
      const res = await fetch('http://localhost:8000/blogs', {
         method: 'POST',
         headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({title, author, body})
      })
      const content = await res.json()
      console.log(content)

      setTitle('')
      setAuthor('')
      setBody('')
      navigate('/')
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className='input-section'>
            <h2>Enter the blog title</h2>
            <input 
               className='input-area' 
               placeholder="Introduction to Javascript" 
               type="text"
               onChange = {(e) => setTitle(e.target.value)}
            />
         </div>
         <div className='input-section'>
            <h2>Enter the author name</h2>
            <input 
               className='input-area' 
               placeholder="Mario" 
               type="text"
               onChange={(e) => setAuthor(e.target.value)}
            />
         </div>
         <div className='input-section'>
            <h2>Enter the blog content</h2>
            <textarea 
               rows="10" 
               className='input-text-area' 
               placeholder="..." 
               type="text"
               onChange={(e) => setBody(e.target.value)}
            />
         </div>
         <button type='submit' className='publish-btn'>Publish</button>
      </form>
   )
}
