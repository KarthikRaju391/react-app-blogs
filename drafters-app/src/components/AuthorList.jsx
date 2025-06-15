import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../hooks/useBlogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faUser } from "@fortawesome/free-solid-svg-icons";

const AuthorList = () => {
	const { blogs, dispatch } = useBlogsContext();
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		const blogAuthors = new Map();
		const arr =
			JSON.parse(localStorage.getItem("blogs")) || (blogs && [...blogs]);
		arr &&
			arr.forEach((blog) => {
				if (!blogAuthors.has(blog.author) && blog.likes) {
					blogAuthors.set(blog.author, blog.likes.length);
				} else {
					if (blog.likes) {
						blogAuthors.set(
							blog.author,
							blogAuthors.get(blog.author) + blog.likes.length
						);
					}
				}
			});

		// Important! Creating an array from a Map
		const blogAuthorsArray = Array.from(blogAuthors, ([author, likes]) => ({
			author,
			likes,
		}));
		setAuthors(
			blogAuthorsArray.sort((a, b) => b.likes - a.likes).slice(0, 6)
		);
	}, [setAuthors, blogs, dispatch]);

	return (
		<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-2xl transition-all duration-300">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
				<h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Authors</h2>
			</div>
			
			<div className="space-y-3">
				{authors && authors.length > 0 ? (
					authors.map((author, index) => (
						<Link
							to={`/author/${author.author}`}
							key={index}
							className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
						>
							<div className="flex items-center space-x-3">
								<div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
									{index + 1}
								</div>
								<div className="flex items-center space-x-2">
									<FontAwesomeIcon icon={faUser} className="text-gray-400 dark:text-gray-500 text-sm" />
									<span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
										{author.author}
									</span>
								</div>
							</div>
							<div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
								<span className="font-medium">{author.likes}</span>
								<FontAwesomeIcon icon={faArrowUp} className="text-xs" />
							</div>
						</Link>
					))
				) : (
					<div className="text-center py-6 text-gray-500 dark:text-gray-400">
						<FontAwesomeIcon icon={faUser} className="text-2xl mb-2" />
						<p className="text-sm">No authors yet</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AuthorList;