import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Dropdown } from "./Dropdown";
import { ThemeToggle } from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
	const { user } = useAuthContext();
	const location = useLocation();
	const path = location.pathname.split("/")[1];

	return (
		<div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
			<nav className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link to={"/"} className="group">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:to-blue-400 transition-all duration-300">
							Drafters
						</h1>
					</Link>
					
					<div className="flex items-center space-x-4">
						<div className="hidden md:flex items-center space-x-6">
							<Link
								className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 relative group"
								to="/"
							>
								Home
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
							</Link>
							{user && (
								<Link
									className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
									to="/blogs/create"
								>
									<FontAwesomeIcon icon={faPenToSquare} />
									<span>Write</span>
								</Link>
							)}
						</div>
						
						<ThemeToggle />
						
						{!user ? (
							<Link
								className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
								to="/auth"
							>
								Login
							</Link>
						) : (
							<Dropdown username={user?.username} />
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};