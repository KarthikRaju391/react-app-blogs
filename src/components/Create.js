import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBlogsContext } from '../hooks/useBlogsContext';
import { userRequest } from '../requestMethods';

export const Create = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [body, setBody] = useState('');
	const [error, setError] = useState(null);

	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { dispatch } = useBlogsContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await userRequest.post('/blogs', {
			title,
			author,
			body,
		});
		// const response = await fetch('http://localhost:4000/api/blogs', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		token: `Bearer ${user.accessToken}`,
		// 	},
		// 	body: JSON.stringify({ title, author, body }),
		// });

		const data = response.data;

		if (!data) {
			setError('Something went wrong...');
		}
		if (data) {
			setTitle('');
			setAuthor('');
			setBody('');
			setError(null);
			dispatch({ type: 'CREATE_BLOG', payload: data });
		}
		navigate('/');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="input-section">
				<h2>Enter the blog title</h2>
				<input
					className="input-area"
					placeholder="Introduction to Javascript"
					type="text"
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			{/* <div className="input-section">
				<h2>Enter the author name</h2>
				<input
					className="input-area"
					placeholder="Mario"
					type="text"
					onChange={(e) => setAuthor(e.target.value)}
				/>
			</div> */}
			<div className="input-section">
				<h2>Enter the blog content</h2>
				<textarea
					rows="10"
					className="input-text-area"
					placeholder="..."
					type="text"
					onChange={(e) => setBody(e.target.value)}
				/>
			</div>
			<button type="submit" className="publish-btn">
				Publish
			</button>
			{error && <div>{error}</div>}
		</form>
	);
};
