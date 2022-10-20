import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../hooks/useBlogContext";

const AuthorList = () => {
	const { blogs, dispatch } = useBlogsContext();
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		const blogAuthors = [];
		const arr = blogs && [...blogs];
		arr && arr.sort((a, b) => b.likes.length - a.likes.length);
		arr &&
			arr.forEach((blog) => {
				if (!blogAuthors.includes(blog.author)) {
					blogAuthors.push(blog.author);
				}
			});
		setAuthors(blogAuthors.slice(0, 6));
	}, [setAuthors, blogs]);

	return (
		<div className="mt-11 w-3/4 mx-auto border rounded-lg p-5 border-gray-200 lg:h-1/2 bg-white hover:shadow-md transition-all">
			<div className="flex gap-2 items-center">
				<span className="bg-teal-800 h-6 w-1"></span>
				<h2 className="text-2xl font-medium">Top Authors</h2>
			</div>
			<ul className="mt-3">
				{authors &&
					authors.map((author, index) => (
						<Link
							to=""
							className="mt-2 block hover:underline"
							key={index}
						>
							<span className="">{index + 1}. </span>
							{author}
						</Link>
					))}
			</ul>
		</div>
	);
};

export default AuthorList;
