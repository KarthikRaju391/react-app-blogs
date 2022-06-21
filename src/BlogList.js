import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export const BlogList = ({ blogs, title }) => {

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
						<div>
							<Link to={`/blog/${blog.id}`}>Read more</Link>
						</div>
					</div>
				</section>
			))}
		</div>
	);
};
