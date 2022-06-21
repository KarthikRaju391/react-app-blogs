import React from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from './useFetch';


export const Blog = () => {
   const path = useLocation();
   const blogId = path.pathname.split('/')[2]

   const { data: blogs, isLoading, error } = useFetch(`http://localhost:8000/blogs/${blogId}`)

   return (
      <div>
         {error && <div>{error}</div>}
         {isLoading && <div>Loading blog...</div>}
         {blogs && <div>
            <h1>{blogs.title}</h1>
            <p className='author-content'>Written by: <span className='author'>{blogs.author}</span></p>
            <article className='article'>{blogs.body}</article>
         </div>}
      </div>
   )
}
