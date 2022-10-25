import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightLong as faArrowRight,
	faBookmark as bookmarkSolid,
	faHeart as heartSolid,
	faSliders,
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
			<div className="flex justify-between items-center">
				<h2 className="text-3xl font-medium">{title}</h2>
				<FontAwesomeIcon
					className="cursor-pointer text-2xl"
					icon={faSliders}
				/>
			</div>
			{blogs.map((blog, index) => {
				let category = blog.category && blog.category.toLowerCase();
				return (
					<section key={index}>
						<div className="blog-preview bg-white mt-5 p-5 border border-gray-200 rounded hover:border-gray-500 transition-all">
							<div>
								<div className="flex justify-between items-center">
									<h2 className="text-xl w-3/4 font-extrabold">
										{blog.title}
									</h2>
									<div className="font-semibold flex items-center gap-2">
										{blog.category}
										<div
											className={`${colors[category]} h-4 w-1`}
										></div>
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
										className="icon hover:translate-x-1 transition-all text-2xl"
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
											className="icon trash ml-3 text-2xl"
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
