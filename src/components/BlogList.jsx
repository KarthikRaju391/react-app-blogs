import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightLong as faArrowRight,
	faBookmark as bookmarkSolid,
	faHeart as heartSolid,
} from "@fortawesome/free-solid-svg-icons";

import {
	faBookmark as bookmark,
	faHeart as heart,
	faXmarkCircle as trash,
	faPenToSquare as edit,
} from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "../hooks/useAuthContext";

export const BlogList = ({ blogs, deleteable, title }) => {
	const { user } = useAuthContext();
	const { deleteBlog, updateBlog } = useBlogs();

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
	const red = "bg-personal";

	return (
		<div className="blog-lists">
			<h2 className="text-3xl font-medium">{title}</h2>
			{blogs.map((blog, index) => {
				let category = "bg-".concat(blog.category.toLowerCase());
				return (
					<section key={index} className="">
						<div className="blog-preview bg-white mt-5 p-5 border border-gray-200 rounded hover:border-gray-500 transition-all">
							<div>
								<div className="flex justify-between items-center">
									<h2 className="text-xl w-3/4 font-extrabold">
										{blog.title}
									</h2>
									<div className="font-semibold flex items-center gap-2">
										{blog.category}
										<div className={`${category} h-4 w-1`}></div>
									</div>
								</div>
								<p className="text-sm">
									{new Date(blog.createdAt).toLocaleString("en-us", {
										month: "long",
										day: "2-digit",
										year: "numeric",
									})}
									{" | "}
									<span className="cursor-pointer hover:underline">
										{blog.author}
									</span>
								</p>
							</div>
							<div className="button-container flex justify-between mt-2">
								{!deleteable && (
									<FontAwesomeIcon
										className="icon bookmark cursor-pointer"
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
										className="icon arrow-right"
										fontSize="larger"
										icon={faArrowRight}
									/>
								</Link>
								{deleteable && (
									<div className="icon-container flex">
										<Link to={`/blog/edit/${blog._id}`}>
											<FontAwesomeIcon
												className="icon edit"
												icon={edit}
												fontSize="larger"
											/>
										</Link>
										<FontAwesomeIcon
											icon={trash}
											fontSize="larger"
											className="icon trash ml-3"
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
