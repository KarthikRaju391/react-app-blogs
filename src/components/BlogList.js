import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
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

export const BlogList = ({ deleteable, setBlogs, blogs, title }) => {
	const [bookmarked, setBookmarked] = useState(false);
	const [like, setLike] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const handleDelete = async (id) => {
		try {
			const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					token: `Bearer ${user?.accessToken}`,
				},
			});
			await response.json();
			setBlogs(blogs.filter((blog) => blog._id !== id));
			setError(null);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className="blog-list">
			{error && <div>{error}</div>}
			<h2>{title}</h2>
			{!error &&
				blogs.map((blog) => (
					<section key={blog._id}>
						<div className="blog-preview">
							<div>
								<h2>{blog.title}</h2>
								<p>Written by {blog.author}</p>
							</div>
							<div className="button-container">
								{!deleteable && (
									<FontAwesomeIcon
										className="icon bookmark"
										icon={bookmarked ? bookmarkSolid : bookmark}
										fontSize="larger"
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
											onClick={() => handleDelete(blog._id)}
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
