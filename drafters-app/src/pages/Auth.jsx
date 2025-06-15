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
		<div className="col-span-3 w-full max-w-md mx-auto mt-20">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						Welcome to Drafters!
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						{register ? "Create your account" : "Sign in to your account"}
					</p>
				</div>
				
				<form className="space-y-6" onSubmit={handleSubmit}>
					{register && (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="firstname">
										First Name
									</label>
									<input
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
										name="firstname"
										type="text"
										placeholder="John"
										onChange={handleChange}
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="lastname">
										Last Name
									</label>
									<input
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
										name="lastname"
										type="text"
										placeholder="Doe"
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
									Email
								</label>
								<input
									className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
									name="email"
									type="email"
									placeholder="john@example.com"
									onChange={handleChange}
									required
								/>
							</div>
						</>
					)}
					
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
							Username
						</label>
						<input
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
							placeholder="test username: testuser"
							name="username"
							type="text"
							onChange={handleChange}
							required
						/>
					</div>
					
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
							Password
						</label>
						<input
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
							placeholder="testuser password: ABCabc123!"
							name="password"
							type="password"
							onChange={handleChange}
							required
						/>
					</div>
					
					{(error || loginError) && (
						<div className="flex items-center justify-center gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 py-3 px-4">
							<FontAwesomeIcon icon={caution} className="text-red-600 dark:text-red-400" />
							<span className="text-red-700 dark:text-red-300 text-sm font-medium">
								{error || loginError}
							</span>
						</div>
					)}
					
					<button
						className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
						disabled={isLoading || loginIsLoading}
						type="submit"
					>
						<div className="flex justify-center items-center gap-3">
							<span>{register ? "Create Account" : "Sign In"}</span>
							{(isLoading || loginIsLoading) && (
								<svg
									className="animate-spin w-4 h-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									fill="currentColor"
								>
									<path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
								</svg>
							)}
						</div>
					</button>
					
					<div className="text-center">
						<button
							type="button"
							onClick={() => setRegister((prevState) => !prevState)}
							className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
						>
							{register
								? "Already have an account? Sign in"
								: "Don't have an account? Create one"}
						</button>
					</div>
					
					{!register && (
						<div className="text-center">
							<Link
								to="/forgot-password"
								className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
							>
								Forgot your password?
							</Link>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Auth;