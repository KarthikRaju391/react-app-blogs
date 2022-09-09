import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faBookmark as bookmarkSolid,
	faHeart as heartSolid,
} from '@fortawesome/free-solid-svg-icons';

import {
	faBookmark as bookmark,
	faHeart as heart,
	faXmarkCircle as trash,
	faPenToSquare as edit,
} from '@fortawesome/free-regular-svg-icons';
import { useAuthContext } from '../hooks/useAuthContext';

export const BlogList = ({ blogs, deleteable, title }) => {
	const { user } = useAuthContext();
	const { deleteBlog, updateBlog } = useBlogs();
	// const handleDelete = (id) => {
	// 	deleteBlog(id);
	// };

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
		<div className="blog-list">
			<h2>{title}</h2>
			{blogs.map((blog, index) => (
				<section key={index}>
					<div className="blog-preview">
						<div>
							<h2>{blog.title}</h2>
							<p>Written by {blog.author}</p>
						</div>
						<div className="button-container">
							{!deleteable && (
								<FontAwesomeIcon
									className="icon bookmark"
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
								<div className="icon-container">
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
										className="icon trash"
										onClick={() => deleteBlog(blog._id)}
									/>
								</div>
							)}
						</div>
					</div>
				</section>
			))}
		</div>
	);
};
