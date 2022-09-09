import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useAuthContext } from '../hooks/useAuthContext';
import 'react-quill/dist/quill.snow.css';
import { useBlogs } from '../hooks/useBlogs';

export const Create = () => {
	// const path = useLocation();
	// const { user } = useAuthContext();
	const { createBlog } = useBlogs();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [error, setError] = useState(null);
	const [update, setUpdate] = useState(false);

	// const blogId = path.pathname.split('/')[3];

	// useEffect(() => {
	// 	blogId && setUpdate(true);

	// 	const fetchBlog = async () => {
	// 		try {
	// 			const response = await fetch(
	// 				`http://localhost:4000/api/blogs/${blogId}`
	// 			);
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setTitle(data.title);
	// 			setBody(data.body);
	// 		} catch (error) {
	// 			setError(error);
	// 		}
	// 	};
	// 	fetchBlog();
	// }, []);

	const handleUpdate = () => {};
	// const handleUpdate = async (e) => {
	// 	e.preventDefault();
	// 	const newData = {
	// 		title,
	// 		body,
	// 	};
	// 	try {
	// 		const res = await fetch(`http://localhost:4000/api/blogs/${blogId}`, {
	// 			method: 'PUT',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				token: `Bearer ${user?.accessToken}`,
	// 			},
	// 			body: JSON.stringify(newData),
	// 		});
	// 		const data = await res.json();
	// 		if (data.error) {
	// 			setError(data.error);
	// 		} else {
	// 			navigate('/');
	// 		}
	// 	} catch (error) {
	// 		setError(error);
	// 	}
	// };
	const handleSubmit = async (e) => {
		e.preventDefault();
		createBlog(title, body);
	};

	return (
		<form onSubmit={update ? handleUpdate : handleSubmit}>
			<div className="input-section">
				<h2>{update ? 'Update' : 'Enter'} the blog title</h2>
				<input
					className="input-area"
					placeholder="Introduction to Javascript"
					value={title || ''}
					type="text"
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="input-section">
				<h2>{update ? 'Update' : 'Enter'} the blog content</h2>
				<ReactQuill theme="snow" value={body || ''} onChange={setBody} />
			</div>
			<button type="submit" className="publish-btn">
				{update ? 'Update' : 'Publish'}
			</button>
			{error && <div>{error}</div>}
		</form>
	);
};
