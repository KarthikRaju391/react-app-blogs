import React, { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';

const Auth = () => {
	const [register, setRegister] = useState(false);
	const [auth, setAuth] = useState(false);
	useEffect(() => {
		return () => {
			setAuth(false);
		};
	});
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
		setAuth(true);
		e.preventDefault();
		register ? await signup(user) : await login(user.username, user.password);
	};

	const handleChange = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	//grid h-screen place-items-center text-xl
	// flex h-full flex-col w-96 justify-center
	return (
		<div className="">
			<form className="" onSubmit={handleSubmit}>
				{register && (
					<>
						<label className="" htmlFor="firstname">
							First Name
						</label>
						<input
							className="border rounded-md text-black border-black focus:outline-none"
							name="firstname"
							type="text"
							onChange={handleChange}
						/>
						<label htmlFor="lastname">Last Name</label>
						<input
							className="border border-black focus:outline-none"
							name="lastname"
							type="text"
							onChange={handleChange}
						/>
						<label htmlFor="email">Email</label>
						<input
							className="border border-black focus:outline-none"
							name="email"
							type="email"
							onChange={handleChange}
						/>
					</>
				)}
				<label htmlFor="username">Username</label>
				<input
					className="border border-black focus:outline-none"
					name="username"
					type="text"
					onChange={handleChange}
				/>
				<label htmlFor="password">Password</label>
				<input
					className="border border-black focus:outline-none"
					name="password"
					type="password"
					onChange={handleChange}
				/>
				<button
					className="border border-black"
					disabled={isLoading || loginIsLoading}
				>
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
