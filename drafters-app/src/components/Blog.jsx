import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBlogs } from "../hooks/useBlogs";
import { useAuthContext } from "../hooks/useAuthContext";
import { faHeart as heart, faEye } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./Loading";

//TODO: figure out icon tooltips
export const Blog = () => {
	const path = useLocation();
	const { user } = useAuthContext();
	const { updateBlog } = useBlogs();
	const blogId = path.pathname.split("/")[2];
	const [error, setError] = useState(null);
	const [blogLoading, setBlogLoading] = useState(true);
	const [blog, setBlog] = useState(null);
	const [views, setViews] = useState(null);
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
					setBlogLoading(false);
					data.draft === false &&
						user !== null &&
						incrementView(data.views);
				}
			} catch (error) {
				if (!unsubscribed) {
					setError(error);
					setBlogLoading(false);
				}
			} finally {
				if (!unsubscribed) {
					setBlogLoading(false);
				}
			}
		};

		fetchBlog();
		return () => {
			unsubscribed = true;
		};
	}, []);

	const incrementView = (blogViews) => {
		setViews(blogViews + 1);
		user &&
			updateBlog(
				blogId,
				{ ...blog, views: blogViews + 1 },
				false,
				false,
				{},
				true
			);
	};

	const handleUpdate = async (id) => {
		if (blog.likes.includes(user?.userId)) {
			const index = blog.likes.findIndex((b) => b === user?.userId);
			blog.likes.splice(index, 1);
			updateBlog(id, blog, false, false, { likeAdd: false }, false);
		} else {
			blog.likes.push(user?.userId);
			updateBlog(id, blog, false, false, { likeAdd: true }, false);
		}
	};

	return (
		<div className="col-span-3 w-full md:w-1/2 mx-auto mt-11">
			{error && <div>{error}</div>}
			{blogLoading && <Loading subtitle={"Loading blog..."} />}
			{blog && (
				<div>
					<h1 className="text-5xl font-bold -ml-1.5">{blog.title}</h1>
					<div className="subheader flex items-center justify-between mt-3">
						<div className="flex items-center">
							<span className="bg-teal-800 h-5 w-1"></span>
							<p className="author-content text-lg pl-2">
								<Link
									className="hover:underline"
									to={`/author/${blog.author}`}
								>
									<span className="author">{blog.author}</span>
								</Link>
								{" | "}
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
						{blog.draft === false && (
							<div className="heart-content flex gap-x-6">
								<div className="flex items-center">
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
								<div className="flex items-center">
									<FontAwesomeIcon className="text-2xl" icon={faEye} />
									<span className="ml-2">{views}</span>
								</div>
							</div>
						)}
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
