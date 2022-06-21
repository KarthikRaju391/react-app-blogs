import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export const BlogList = ({ blogs, title }) => {

	const navigate = useNavigate();

	const handleDelete = async (id) => {
		await fetch(`http://localhost:8000/blogs/${id}`, {
			method: 'DELETE'
		})
		
		window.location.reload();
	}	

	return (
		<div className="blog-list">
			<h2>{title}</h2>
			{blogs.map((blog) => (
				<section key={blog.id}>
					<div className="blog-preview">
						<div>
							<h2>{blog.title}</h2>
							<p>Written by {blog.author}</p>
						</div>
						<div className='button-container'>
							<Link className='read-more' to={`/blog/${blog.id}`}>Read more</Link>
							<button onClick={() => handleDelete(blog.id)} className='delete-btn'>Delete</button>
						</div>
					</div>
				</section>
			))}
		</div>
	);
};
