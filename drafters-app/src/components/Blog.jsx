import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBlogs } from "../hooks/useBlogs";
import { useAuthContext } from "../hooks/useAuthContext";
import { faHeart as heart, faEye, faBookmark, faShare } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid, faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { BlogContentSkeleton } from "./LoadingSkeleton";

export const Blog = () => {
	const URL = import.meta.env.VITE_APP_URL;
	const path = useLocation();
	const { user } = useAuthContext();
	const { updateBlog } = useBlogs();
	const blogId = path.pathname.split("/")[2];
	const [error, setError] = useState(null);
	const [blogLoading, setBlogLoading] = useState(true);
	const [blog, setBlog] = useState(null);
	const [views, setViews] = useState(null);
	const [readingTime, setReadingTime] = useState(0);

	useEffect(() => {
		let unsubscribed = false;
		const fetchBlog = async () => {
			try {
				const response = await fetch(`${URL}/blogs/${blogId}`);
				const data = await response.json();
				if (!unsubscribed) {
					setError(null);
					setBlog(data);
					setBlogLoading(false);
					
					// Calculate reading time (average 200 words per minute)
					const wordCount = data.body.replace(/<[^>]*>/g, '').split(/\s+/).length;
					setReadingTime(Math.ceil(wordCount / 200));
					
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

	const handleLike = async (id) => {
		if (blog.likes.includes(user?.userId)) {
			const index = blog.likes.findIndex((b) => b === user?.userId);
			blog.likes.splice(index, 1);
			updateBlog(id, blog, false, false, { likeAdd: false }, false);
		} else {
			blog.likes.push(user?.userId);
			updateBlog(id, blog, false, false, { likeAdd: true }, false);
		}
	};

	const handleBookmark = async (id) => {
		if (blog.bookmark.includes(user?.userId)) {
			const index = blog.bookmark.findIndex((b) => b === user?.userId);
			blog.bookmark.splice(index, 1);
			updateBlog(id, blog, false, false, {}, false);
		} else {
			blog.bookmark.push(user?.userId);
			updateBlog(id, blog, false, true, {}, false);
		}
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: blog.title,
					text: `Check out this blog post: ${blog.title}`,
					url: window.location.href,
				});
			} catch (error) {
				console.log('Error sharing:', error);
			}
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(window.location.href);
			// You could show a toast notification here
		}
	};

	if (blogLoading) {
		return <BlogContentSkeleton />;
	}

	if (error) {
		return (
			<div className="col-span-3 w-full md:w-3/4 lg:w-1/2 mx-auto mt-11">
				<div className="text-center py-12">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Oops! Something went wrong
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						We couldn't load this blog post. Please try again later.
					</p>
				</div>
			</div>
		);
	}

	if (!blog) {
		return (
			<div className="col-span-3 w-full md:w-3/4 lg:w-1/2 mx-auto mt-11">
				<div className="text-center py-12">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Blog not found
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						The blog post you're looking for doesn't exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="col-span-3 w-full md:w-3/4 lg:w-1/2 mx-auto mt-11">
			<article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden">
				{blog.image && blog.image !== "" && (
					<div className="aspect-video w-full overflow-hidden">
						<img
							className="w-full h-full object-cover"
							src={blog.image}
							alt={blog.title}
						/>
					</div>
				)}
				
				<div className="p-8">
					<header className="mb-8">
						<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
							{blog.title}
						</h1>
						
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
							<div className="flex items-center space-x-4">
								<div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
								<div>
									<Link
										className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
										to={`/author/${blog.author}`}
									>
										{blog.author}
									</Link>
									<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
										<time>
											{formatDistanceToNow(new Date(blog.createdAt), {
												addSuffix: true,
											})}
										</time>
										<span className="w-1 h-1 bg-gray-400 rounded-full"></span>
										<span>{readingTime} min read</span>
									</div>
								</div>
							</div>
							
							{blog.draft === false && user && (
								<div className="flex items-center space-x-4">
									<button
										className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
											blog.likes && blog.likes.includes(user?.userId)
												? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 focus:ring-red-500'
												: 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500'
										}`}
										onClick={() => handleLike(blogId)}
										aria-label={blog.likes && blog.likes.includes(user?.userId) ? 'Unlike post' : 'Like post'}
									>
										<FontAwesomeIcon
											icon={
												blog.likes && blog.likes.includes(user?.userId)
													? heartSolid
													: heart
											}
										/>
										<span className="font-medium">
											{blog.likes.length > 0 && blog.likes.length}
										</span>
									</button>
									
									<button
										className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
											blog.bookmark && blog.bookmark.includes(user?.userId)
												? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 focus:ring-blue-500'
												: 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500'
										}`}
										onClick={() => handleBookmark(blogId)}
										aria-label={blog.bookmark && blog.bookmark.includes(user?.userId) ? 'Remove bookmark' : 'Add bookmark'}
									>
										<FontAwesomeIcon
											icon={
												blog.bookmark && blog.bookmark.includes(user?.userId)
													? bookmarkSolid
													: bookmark
											}
										/>
									</button>
									
									<div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
										<FontAwesomeIcon icon={faEye} />
										<span className="font-medium">{views}</span>
									</div>
									
									<button
										onClick={handleShare}
										className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
										aria-label="Share post"
									>
										<FontAwesomeIcon icon={faShare} />
									</button>
								</div>
							)}
						</div>
					</header>
					
					<div className="prose prose-lg dark:prose-invert max-w-none">
						<div
							className="blog-content text-gray-800 dark:text-gray-200 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(blog.body),
							}}
						/>
					</div>
				</div>
			</article>
		</div>
	);
};