import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="">
			<nav className="grid grid-cols-2">
				<h1 className="text-2xl font-bold flex justify-start items-center">
					Drafters
				</h1>
				<div className="text-base links flex justify-end items-center">
					<Link
						className="hover:border-b-2 border-black hidden md:flex transition-all duration-75"
						to="/"
					>
						Home
					</Link>
					<Link
						className="hover:border-b-2 border-black hidden ml-10 md:flex transition-all duration-75"
						to="/blog/create"
					>
						Write
					</Link>
					{!user ? (
						<Link
							className="ml-5 hover:border-b-2 border-black"
							to="/auth"
						>
							Login
						</Link>
					) : (
						<>
							<button
								className="ml-10 flex items-center border-b-2 border-black"
								type="button"
								data-dropdown-toggle="dropdown"
								aria-expanded="false"
								onClick={() => setIsOpen((prevState) => !prevState)}
							>
								{`Hi, ${user?.username}`}
								<svg
									className="w-4 h-4 ml-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</button>

							{isOpen && (
								<div
									className="dropdown-menu
									min-w-max
									absolute
									bg-white
									text-base
									right-16
									top-16
									z-50
									list-none
									text-left
									rounded-lg
									shadow-lg
									bg-clip-padding
									border-none
									"
									aria-labelledby="dropdownMenuButton"
								>
									<Link
										className="
									dropdown-item
									text-sm
									py-3
									px-5
									font-normal
									block
									w-full
									whitespace-nowrap
									bg-transparent
									"
										to={`/blogs/${user?.username}`}
									>
										Your Blogs
									</Link>
									<Link
										className="
										dropdown-item
										text-sm
										py-3
										px-5
										font-normal
										block
										w-full
										whitespace-nowrap
										bg-transparent
									"
										to={`/blogs/${user?.username}/bookmarks`}
									>
										Your Bookmarks
									</Link>
									<p
										className="
										dropdown-item
										text-sm
										py-3
										px-5
										font-normal
										block
										w-full
										whitespace-nowrap
										bg-transparent
									"
										onClick={handleLogout}
									>
										Logout
									</p>
								</div>
							)}
						</>
					)}
				</div>
			</nav>
		</div>
	);
};
