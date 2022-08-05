import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Create = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [body, setBody] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await fetch('http://localhost:4000/api/blogs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWI5MWM4OGFkOWJkNTc1MjBjYzNjNCIsImZpcnN0bmFtZSI6IkthcnRoaWsiLCJsYXN0bmFtZSI6IlJhanUiLCJpYXQiOjE2NTk2MDU0NDgsImV4cCI6MTY1OTg2NDY0OH0.nf5bgr5fm3fnk7LLibbIRhjTdC9GiEulGwu_Moc_I60`,
			},
			body: JSON.stringify({ title, author, body }),
		});

		setTitle('');
		setAuthor('');
		setBody('');
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
		</form>
	);
};
