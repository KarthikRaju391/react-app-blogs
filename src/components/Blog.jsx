import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';

//TODO: figure out icon tooltips
export const Blog = () => {
	const path = useLocation();
	const blogId = path.pathname.split('/')[2];
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [blog, setBlog] = useState(null);
	useEffect(() => {
		let unsubscribed = false;
		console.log(path);
		const fetchBlog = async () => {
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
					<div className="subheader">
						<p className="author-content">
							Written by: <span className="author">{blog.author}</span>
							{' |  '}
							{formatDistanceToNow(
								new Date(
									// checking if updated date is recent or not
									blog.updatedAt > blog.createdAt
										? blog.updatedAt
										: blog.createdAt
								),
								{
									addSuffix: true,
								}
							)}
						</p>
						<div className="heart-content">
							<FontAwesomeIcon
								className="icon"
								fontSize="larger"
								icon={heart}
							/>
							<span className="heart-count">
								{blog.likes > 0 && blog.likes}
							</span>
						</div>
					</div>
					<article className="article">
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
