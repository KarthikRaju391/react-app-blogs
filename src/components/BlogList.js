import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { userRequest } from '../requestMethods';

export const BlogList = ({ deleteable, blogs, title }) => {
	const { user } = useAuthContext();
	const handleDelete = async (id) => {
		// await fetch(`blogs/${id}`, {
		// 	method: 'DELETE',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		token: `Bearer ${user.accessToken}`,
		// },
		// });
		await userRequest.delete(`blogs/${id}`);

		window.location.reload();
	};
	return (
		<div className="blog-list">
			<h2>{title}</h2>
			{blogs.map((blog) => (
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
