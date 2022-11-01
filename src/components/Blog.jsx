import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBlogs } from "../hooks/useBlogs";
import { useAuthContext } from "../hooks/useAuthContext";
import { faHeart as heart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";

//TODO: figure out icon tooltips
export const Blog = () => {
	const path = useLocation();
	const { user } = useAuthContext();
	const { updateBlog } = useBlogs();
	const blogId = path.pathname.split("/")[2];
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [blog, setBlog] = useState(null);
	useEffect(() => {
		let unsubscribed = false;
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
		// blog && updateBlog(blogId, { ...blog, views: blog?.views + 1 }, false);
		return () => {
			unsubscribed = true;
		};
	}, [blogId]);

	const handleUpdate = async (id) => {
		if (blog.likes.includes(user?.userId)) {
			const index = blog.likes.findIndex((b) => b === user?.userId);
			blog.likes.splice(index, 1);
		} else {
			blog.likes.push(user?.userId);
		}
		updateBlog(id, blog, false);
	};

	return (
		<div className="col-span-3 w-full md:w-1/2 mx-auto mt-11">
			{error && <div>{error}</div>}
			{isLoading && <div>Loading blog...</div>}
			{blog && (
				<div>
					<h1 className="text-5xl font-bold -ml-1.5">{blog.title}</h1>
					<div className="subheader flex items-center justify-between mt-3">
						<div className="flex items-center">
							<span className="bg-teal-800 h-5 w-1"></span>
							<p className="author-content text-lg pl-2">
								<Link to="">
									<span className="author">{blog.author}</span>
								</Link>
								{" |  "}
								{formatDistanceToNow(
									new Date(
										blog.createdAt
										// checking if updated date is recent or not
										// blog.updatedAt > blog.createdAt
										// 	? blog.updatedAt
										// 	: blog.createdAt
									),
									{
										addSuffix: true,
									}
								)}
							</p>
						</div>
						<div className="heart-content ">
							<FontAwesomeIcon
								className="icon text-2xl cursor-pointer"
								fontSize="larger"
								icon={
									blog.likes && blog.likes.includes(user?.userId)
										? heartSolid
										: heart
								}
								onClick={() => handleUpdate(blogId)}
							/>
							<span className="heart-count ml-2">
								{blog.likes.length > 0 && blog.likes.length}
							</span>
						</div>
					</div>
					<article className="article mt-5 text-lg">
						{
							<div
								className="blog-content"
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