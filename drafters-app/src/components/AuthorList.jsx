import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../hooks/useBlogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
		<>
			<div className="mt-11 w-3/4 mx-auto border rounded-lg hidden lg:block p-5 border-gray-200 bg-white hover:shadow-md transition-all">
				<div className="flex gap-2 items-center">
					<span className="bg-teal-800 h-6 w-1"></span>
					<h2 className="text-2xl font-medium">Top Authors</h2>
				</div>
				<ul className="">
					{authors &&
						authors.map((author, index) => (
							<Link
								to={`/author/${author.author}`}
								className="mt-2 block"
								key={index}
							>
								<span>{index + 1}. </span>
								{author.author}
								<span>
									{" "}
									({author.likes}) <FontAwesomeIcon icon={faArrowUp} />
								</span>
							</Link>
						))}
				</ul>
			</div>
		</>
	);
};

export default AuthorList;
