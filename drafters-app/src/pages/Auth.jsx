import React, { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading } from "../components/Loading";
import { faTriangleExclamation as caution } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
	const [register, setRegister] = useState(false);
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
		register ? await signup(user) : await login(user.username, user.password);
	};

	const handleChange = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="col-span-3 w-4/12 mx-auto h-[500px] my-20">
			<h1 className="text-3xl font-bold text-center">
				Welcome to Drafters!
			</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				{register && (
					<>
						<div className="flex gap-12 w-full items-center">
							<div className="block w-1/2">
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
							<div className="block">
								<label className="mt-4" htmlFor="lastname">
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
					name="username"
					type="text"
					onChange={handleChange}
				/>
				<label className="mt-4" htmlFor="password">
					Password
				</label>
				<input
					className="border rounded p-2 font-bold text-black border-black focus:outline-none"
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
					className="border border-black mt-5 w-1/3 mx-auto bg-black text-white px-2 py-3"
					disabled={isLoading || loginIsLoading}
				>
					{register ? "Register" : "Login"}
				</button>
				{(isLoading || loginIsLoading) && (
					<Loading subtitle={"Getting you in..."} />
				)}
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
			</form>
		</div>
	);
};

export default Auth;
