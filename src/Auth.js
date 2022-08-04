import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
	const navigate = useNavigate();
	const [register, setRegister] = useState(false);
	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
	});
	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(
			register
				? 'http://localhost:4000/api/auth/signup'
				: 'http://localhost:4000/api/auth/login',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			}
		);
		const userDetails = await response.json();
		localStorage.setItem('user', JSON.stringify(userDetails));
		navigate('/');
	};

	const handleChange = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				{register && (
					<>
						<label htmlFor="firstname">First Name</label>
						<input name="firstname" type="text" onChange={handleChange} />
						<label htmlFor="lastname">Last Name</label>
						<input name="lastname" type="text" onChange={handleChange} />
						<label htmlFor="email">Email</label>
						<input name="email" type="email" onChange={handleChange} />
					</>
				)}
				<label htmlFor="username">Username</label>
				<input name="username" type="text" onChange={handleChange} />
				<label htmlFor="password">Password</label>
				<input name="password" type="password" onChange={handleChange} />
				<button>{register ? 'Register' : 'Login'}</button>
				<p onClick={() => setRegister((prevState) => !prevState)}>
					{register
						? 'Already have an account? Login'
						: "Don't have an account? Register"}
				</p>
			</form>
		</div>
	);
};

export default Auth;
