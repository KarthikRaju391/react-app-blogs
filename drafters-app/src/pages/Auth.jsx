import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation as caution } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
	const [register, setRegister] = useState(false);
	const [showError, setShowError] = useState(false);
	const [auth, setAuth] = useState(false);
	useEffect(() => {
		return () => {
			setAuth(false);
		};
	});
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
	});
	const { signup, isLoading, error } = useSignup();
	const { login, loginIsLoading, loginError } = useLogin();
	const handleSubmit = async (e) => {
		setAuth(true);
		e.preventDefault();
		register
			? await signup(user)
			: await login(user.username, user.password);
	};

	const handleChange = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleError = () => {
		setShowError(true);
		setTimeout(() => {
			setShowError((prev) => !prev);
		}, 1500);
	};

	return (
		<div className="col-span-3 md:w-4/12 mx-auto h-screen mt-40 md:mt-20">
			<h1 className="text-3xl font-bold text-center">
				Welcome to Drafters!
			</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				{register && (
					<>
						<div className="flex flex-col mt-10 lg:flex-row lg:justify-between">
							<div className="flex flex-col lg:w-60">
								<label className="" htmlFor="firstname">
									First Name
								</label>
								<input
									className="border rounded p-2 font-bold text-black border-black focus:outline-none"
									name="firstname"
									type="text"
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col lg:w-60">
								<label
									className="mt-4 md:mt-0"
									htmlFor="lastname"
								>
									Last Name
								</label>
								<input
									className="border rounded p-2 font-bold text-black border-black focus:outline-none"
									name="lastname"
									type="text"
									onChange={handleChange}
								/>
							</div>
						</div>
						<label className="mt-4" htmlFor="email">
							Email
						</label>
						<input
							className="border rounded p-2 font-bold text-black border-black focus:outline-none"
							name="email"
							type="email"
							onChange={handleChange}
						/>
					</>
				)}
				<label className="mt-4" htmlFor="username">
					Username
				</label>
				<input
					className="border rounded p-2 font-bold text-black border-black focus:outline-none"
					placeholder="test username: testuser"
					name="username"
					type="text"
					onChange={handleChange}
				/>
				<label className="mt-4" htmlFor="password">
					Password
				</label>
				<input
					className="border rounded p-2 font-bold text-black border-black focus:outline-none"
					placeholder="testuser password : ABCabc123!"
					name="password"
					type="password"
					onChange={handleChange}
				/>
				{(error || loginError) && (
					<div className="flex items-center justify-center gap-2 rounded-full bg-red-300 mt-5 border-red-600 border-2 py-2">
						<FontAwesomeIcon icon={caution} />
						{error || loginError}
					</div>
				)}
				<button
					className="border transition-all border-black mt-5 w-1/3 mx-auto bg-black px-2 py-3"
					disabled={isLoading || loginIsLoading}
				>
					<div className="transition-all text-white flex justify-center gap-x-4 items-center">
						{register ? "Register" : "Login"}
						{(isLoading || loginIsLoading) && (
							<svg
								className="animate-spin"
								width="15px"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								fill="white"
							>
								<path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
							</svg>
						)}
					</div>
				</button>
				<p
					className="mx-auto mt-4"
					onClick={() => setRegister((prevState) => !prevState)}
				>
					<span className="underline cursor-pointer">
						{register
							? "Already have an account? Login"
							: "Don't have an account? Register"}
					</span>
				</p>
				
				{!register && (
					<div className="text-center mt-4">
						<Link
							to="/forgot-password"
							className="text-sm text-gray-600 hover:text-gray-800 underline"
						>
							Forgot your password?
						</Link>
					</div>
				)}
			</form>
		</div>
	);
};

export default Auth;