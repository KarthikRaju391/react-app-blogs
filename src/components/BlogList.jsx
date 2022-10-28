import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { useBlogsContext } from "../hooks/useBlogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightLong as faArrowRight,
	faBookmark as bookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";

import {
	faBookmark as bookmark,
	faXmarkCircle as trash,
	faPenToSquare as edit,
} from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "../hooks/useAuthContext";
import { Filter } from "./Filter";

export const BlogList = ({ blogs, deleteable, title }) => {
	const { user } = useAuthContext();
	const { deleteBlog, updateBlog, getUserBookmarks } = useBlogs();
	const { dispatch } = useBlogsContext();

	// colors
	const colors = {
		personal: "bg-gray-500",
		tech: "bg-red-400",
		"self-help": "bg-green-500",
		entertainment: "bg-sky-500",
		lifestyle: "bg-indigo-500",
	};

	const handleUpdate = async (id) => {
		const blog = blogs.find((b) => b._id === id);
		if (blog.bookmark.includes(user?.userId)) {
			const index = blog.bookmark.findIndex((b) => b === user?.userId);
			blog.bookmark.splice(index, 1);
		} else {
			blog.bookmark.push(user?.userId);
		}
		updateBlog(id, blog, false);
	};

	return (
		<div className="blog-lists">
			<div className="flex justify-between">
				<h2 className="text-3xl font-medium">{title}</h2>
				<Filter />
			</div>
			{blogs.map((blog, index) => {
				let category = blog.category && blog.category.toLowerCase();
				return (
					<section key={index}>
						<div className="group blog-preview bg-white mt-5 p-5 border border-gray-200 rounded hover:border-gray-500 transition-all">
							<div>
								<div className="flex justify-between items-center">
									<Link className="w-3/4" to={`/blog/${blog._id}`}>
										<h2 className="text-2xl w-3/4 font-extrabold">
											{blog.title?.split(" ").length > 5
												? blog.title
														.split(" ")
														.slice(0, 4)
														.join(" ") + "..."
												: blog.title}{" "}
										</h2>
									</Link>
									<Link
										className="font-semibold hover:underline transition flex items-center gap-2"
										to={`/blogs/category/${blog.category}`}
									>
										{blog.category}
										<div
											className={`${colors[category]} h-4 w-1 `}
										></div>
									</Link>
								</div>
								<p className="text-sm font-semibold">
									{new Date(blog.createdAt).toLocaleString("en-us", {
										month: "long",
										day: "2-digit",
										year: "numeric",
									})}
									{" | "}
									<Link
										to={`/author/${blog.author}`}
										className="cursor-pointer hover:underline"
									>
										{blog.author}
									</Link>
								</p>
							</div>
							<div className="button-container flex justify-between mt-2">
								{!deleteable && user && (
									<FontAwesomeIcon
										className="icon bookmark cursor-pointer text-2xl"
										icon={
											blog.bookmark &&
											blog.bookmark.includes(user?.userId)
												? bookmarkSolid
												: bookmark
										}
										fontSize="larger"
										onClick={() => handleUpdate(blog._id)}
									/>
								)}
								<Link className="read-more" to={`/blog/${blog._id}`}>
									<FontAwesomeIcon
										className="icon group-hover:translate-x-1 transition-all text-2xl"
										fontSize="larger"
										icon={faArrowRight}
									/>
								</Link>
								{deleteable && (
									<div className="icon-container flex">
										<Link to={`/blog/edit/${blog._id}`}>
											<FontAwesomeIcon
												className="icon edit text-2xl"
												icon={edit}
												fontSize="larger"
											/>
										</Link>
										<FontAwesomeIcon
											icon={trash}
											fontSize="larger"
											className="icon trash ml-3 text-2xl cursor-pointer"
											onClick={() => deleteBlog(blog._id)}
										/>
									</div>
								)}
							</div>
						</div>
					</section>
				);
			})}
		</div>
	);
};
