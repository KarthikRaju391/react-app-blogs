import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { BlogList } from './BlogList';
import { userRequest } from '../requestMethods';

export const UserBlogs = () => {
	const { user } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [blogs, setBlogs] = useState(null);

	useEffect(() => {
		let unsubscribed = false;
		const fetchUserBlogs = async () => {
			const response = await userRequest.get('blogs/user/blogs');
			const data = await response.data;
			if (!data) {
				setIsLoading(false);
				setError(true);
			}
			if (data && !unsubscribed) {
				setBlogs(data);
				setIsLoading(false);
			}
		};
		fetchUserBlogs();
		return () => {
			unsubscribed = true;
		};
	}, []);
	const handleDelete = async (id) => {
		await fetch(`http://localhost:4000/api/blogs/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user && user.accessToken}`,
			},
		});
	};
	return (
		<div className="home">
			{error && <div>Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList deleteable={true} blogs={blogs} title="Your Blogs" />
			)}
		</div>
		// <div className="blog-list">
		// 	<h2>Your Blogs</h2>
		// 	{blogs &&
		// 		blogs.map((blog) => (
		// 			<section key={blog._id}>
		// 				<div className="blog-preview">
		// 					<div>
		// 						<h2>{blog.title}</h2>
		// 						<p>Written by {blog.author}</p>
		// 					</div>
		// 					<div className="button-container">
		// 						<Link className="read-more" to={`/blog/${blog._id}`}>
		// 							Read more
		// 						</Link>
		// 						<button
		// 							onClick={() => handleDelete(blog._id)}
		// 							className="delete-btn"
		// 						>
		// 							Delete
		// 						</button>
		// 					</div>
		// 				</div>
		// 			</section>
		// 		))}
		// </div>
	);
};
