import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { publicRequest } from '../requestMethods';

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
			const response = await publicRequest(`blogs/${blogId}`);
			const data = response.data;
			if (!data) {
				setIsLoading(false);
				setError('unable to fetch the data...');
			}
			if (data && !unsubscribed) {
				setIsLoading(false);
				setBlog(data);
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
					<article className="article">{blog.body}</article>
				</div>
			)}
		</div>
	);
};
