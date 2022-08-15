import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export const BlogList = ({ deleteable, setBlogs, blogs, title }) => {
	const [error, setError] = useState(null);
	const { user } = useAuthContext();
	const handleDelete = async (id) => {
		try {
			const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					token: `Bearer ${user?.accessToken}`,
				},
			});
			await response.json();
			setBlogs(blogs.filter((blog) => blog._id !== id));
			setError(null);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className="blog-list">
			{error && <div>{error}</div>}
			<h2>{title}</h2>
			{!error &&
				blogs.map((blog) => (
					<section key={blog._id}>
						<div className="blog-preview">
							<div>
								<h2>{blog.title}</h2>
								<p>Written by {blog.author}</p>
							</div>
							<div className="button-container">
								<Link className="read-more" to={`/blog/${blog._id}`}>
									Read more
								</Link>
								{deleteable && (
									<button
										onClick={() => handleDelete(blog._id)}
										className="delete-btn"
									>
										Delete
									</button>
								)}
							</div>
						</div>
					</section>
				))}
		</div>
	);
};
