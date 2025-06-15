import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import {
	faBookmark as bookmark,
	faXmarkCircle as trash,
	faPenToSquare as edit,
	faEye,
	faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "../hooks/useAuthContext";
import { Filter } from "./Filter";

export const BlogList = ({ blogs, deleteable, title, blogsType }) => {
	const { user } = useAuthContext();
	const { deleteBlog, updateBlog } = useBlogs();
	const location = useLocation();
	const path = location.pathname.split("/")[3];
	
	// Enhanced color scheme for categories
	const colors = {
		personal: "from-gray-500 to-gray-600",
		tech: "from-red-500 to-red-600",
		"self-help": "from-green-500 to-green-600",
		entertainment: "from-blue-500 to-blue-600",
		lifestyle: "from-purple-500 to-purple-600",
	};

	const handleUpdate = async (id) => {
		const blog = blogs.find((b) => b._id === id);
		if (blog.bookmark.includes(user?.userId)) {
			const index = blog.bookmark.findIndex((b) => b === user?.userId);
			blog.bookmark.splice(index, 1);
			updateBlog(id, blog, false, false, {}, false);
		} else {
			blog.bookmark.push(user?.userId);
			updateBlog(id, blog, false, true, {}, false);
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	const truncateTitle = (title) => {
		if (!title) return "";
		const words = title.split(" ");
		return words.length > 8 ? words.slice(0, 8).join(" ") + "..." : title;
	};

	return (
		<div className="blog-lists">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
					{title}
				</h2>
				<Filter blogsType={blogsType} />
			</div>
			
			<div className="space-y-6">
				{blogs.map((blog, index) => {
					let category = blog.category && blog.category.toLowerCase();
					return (
						<article key={index} className="group">
							<div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
								<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-3">
											<Link 
												className="block flex-1 min-w-0 mr-4" 
												to={`/blog/${blog._id}`}
											>
												<h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
													{truncateTitle(blog.title)}
												</h3>
											</Link>
											
											<Link
												className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r hover:shadow-md transition-all duration-200 transform hover:scale-105 flex-shrink-0"
												to={`/blogs/category/${blog.category}`}
												style={{
													background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
												}}
												className={`bg-gradient-to-r ${colors[category] || 'from-gray-500 to-gray-600'} text-white px-3 py-1 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 transform hover:scale-105 flex-shrink-0`}
											>
												<span>{blog.category}</span>
											</Link>
										</div>
										
										<div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
											<time className="font-medium">
												{formatDate(blog.createdAt)}
											</time>
											<span className="w-1 h-1 bg-gray-400 rounded-full"></span>
											<Link
												to={`/author/${blog.author}`}
												className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
											>
												{blog.author}
											</Link>
											{blogsType !== "Your Drafts" && (
												<>
													<span className="w-1 h-1 bg-gray-400 rounded-full"></span>
													<div className="flex items-center space-x-1">
														<FontAwesomeIcon icon={faEye} className="text-xs" />
														<span>{blog.views || 0}</span>
													</div>
													<span className="w-1 h-1 bg-gray-400 rounded-full"></span>
													<div className="flex items-center space-x-1">
														<FontAwesomeIcon icon={faHeart} className="text-xs" />
														<span>{blog.likes?.length || 0}</span>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
								
								<div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
									{!deleteable && user && (
										<button
											onClick={() => handleUpdate(blog._id)}
											className={`p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
												blog.bookmark && blog.bookmark.includes(user?.userId)
													? 'text-blue-600 dark:text-blue-400'
													: 'text-gray-400 dark:text-gray-500'
											}`}
											aria-label={blog.bookmark && blog.bookmark.includes(user?.userId) ? 'Remove bookmark' : 'Add bookmark'}
										>
											<FontAwesomeIcon
												icon={
													blog.bookmark && blog.bookmark.includes(user?.userId)
														? bookmarkSolid
														: bookmark
												}
												className="text-lg"
											/>
										</button>
									)}
									
									{deleteable && (
										<div className="flex items-center space-x-2">
											<Link 
												to={`/blogs/edit/${blog._id}`}
												className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
												aria-label="Edit blog"
											>
												<FontAwesomeIcon icon={edit} className="text-lg" />
											</Link>
											<button
												onClick={() => {
													if (path === undefined)
														deleteBlog(blog._id, true, "user");
													else deleteBlog(blog._id, true, path);
												}}
												className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
												aria-label="Delete blog"
											>
												<FontAwesomeIcon icon={trash} className="text-lg" />
											</button>
										</div>
									)}
									
									{!deleteable && !user && (
										<div className="text-sm text-gray-500 dark:text-gray-400">
											Login to bookmark
										</div>
									)}
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
};