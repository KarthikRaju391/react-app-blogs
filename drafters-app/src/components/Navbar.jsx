import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Dropdown } from "./Dropdown";

export const Navbar = () => {
	const { user } = useAuthContext();

	return (
		<div className="">
			<nav className="grid grid-cols-2">
				<Link to={"/"}>
					<h1 className="text-3xl font-bold flex justify-start items-center">
						Drafters
					</h1>
				</Link>
				<div className="text-base links flex justify-end items-center">
					<Link
						className="hover:border-b-4 text-xl border-black hidden md:flex transition-all duration-75"
						to="/"
					>
						Home
					</Link>
					<Link
						className="hover:border-b-4 text-xl border-black hidden ml-10 md:flex transition-all duration-75"
						to="/blogs/create"
					>
						Write
					</Link>
					{!user ? (
						<Link
							className="ml-10 hover:border-b-4 transition-all duration-75 text-lg md:text-xl border-black"
							to="/auth"
						>
							Login
						</Link>
					) : (
						<Dropdown username={user?.username} />
					)}
				</div>
			</nav>
		</div>
	);
};
