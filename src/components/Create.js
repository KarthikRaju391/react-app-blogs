import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useAuthContext } from '../hooks/useAuthContext';
import 'react-quill/dist/quill.snow.css';

export const Create = () => {
	const { user } = useAuthContext();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:4000/api/blogs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user?.accessToken}`,
			},
			body: JSON.stringify({
				title,
				body,
			}),
		});
		const data = await response.json();
		if (response.ok) {
			navigate('/');
		} else {
			setError(data.message);
		}
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
			<div className="input-section">
				<h2>Enter the blog content</h2>
				<ReactQuill theme="snow" value={body} onChange={setBody} />
			</div>
			<button type="submit" className="publish-btn">
				Publish
			</button>
			{error && <div>{error}</div>}
		</form>
	);
};
