import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';

const Auth = () => {
	const [register, setRegister] = useState(false);
	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
	});
	const { signup, isLoading, error } = useSignup();
	const { login, loginIsLoading, loginError } = useLogin();
	const handleSubmit = async (e) => {
		e.preventDefault();
		register ? await signup(user) : await login(user.username, user.password);
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
				<button disabled={isLoading || loginIsLoading}>
					{register ? 'Register' : 'Login'}
				</button>
				<p onClick={() => setRegister((prevState) => !prevState)}>
					{register
						? 'Already have an account? Login'
						: "Don't have an account? Register"}
				</p>
				{(error || loginError) && <div>{error || loginError}</div>}
			</form>
		</div>
	);
};

export default Auth;
