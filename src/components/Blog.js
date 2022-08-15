import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';

export const Blog = () => {
	const path = useLocation();
	const blogId = path.pathname.split('/')[2];
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [blog, setBlog] = useState(null);
	// const { data: blogs, isLoading, error } = useFetch(`blogs/${blogId}`);
	useEffect(() => {
		let unsubscribed = false;
		const fetchBlog = async () => {
			// write the code to get the blog from the server
			// and set the state accordingly (setIsLoading, setError, setBlog)
			try {
				const response = await fetch(
					`http://localhost:4000/api/blogs/${blogId}`
				);
				const data = await response.json();
				if (!unsubscribed) {
					setError(null);
					setBlog(data);
					setIsLoading(false);
				}
			} catch (error) {
				if (!unsubscribed) {
					setError(error);
					setIsLoading(false);
				}
			} finally {
				if (!unsubscribed) {
					setIsLoading(false);
				}
			}
		};

		fetchBlog();
		return () => {
			unsubscribed = true;
		};
	}, [blogId]);

	return (
		<div>
			{error && <div>{error}</div>}
			{isLoading && <div>Loading blog...</div>}
			{blog && (
				<div>
					<h1>{blog.title}</h1>
					<p className="author-content">
						Written by: <span className="author">{blog.author}</span>
					</p>
					<article className="article">
						{/* {blog.body} */}
						{
							<div
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(blog.body),
								}}
							/>
						}
					</article>
				</div>
			)}
		</div>
	);
};
