import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export const Dropdown = ({ username }) => {
	const { logout } = useLogout();
	const [open, setOpen] = useState(false);

	const menuRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	const handleLogout = () => {
		logout();
		setOpen(false);
	};

	return (
		<div ref={menuRef} className="ml-10 relative inline-block text-left">
			<div>
				<button
					onClick={() => setOpen((prevState) => !prevState)}
					type="button"
					className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
				>
					{`Hi, ${username}`}
					<svg
						className="-mr-1 ml-2 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			{open /* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */ && (
				<div
					className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabIndex="-1"
				>
					<div className="py-1" role="none">
						{/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
						<Link
							className="text-gray-700 block px-4 py-2 text-md active:bg-gray-100 active:text-gray-900"
							to={`/blogs/${username}`}
							role="menuitem"
							tabIndex="-1"
							id="menu-item-0"
						>
							Your blogs
						</Link>
						<Link
							to={`/blogs/${username}/bookmarks`}
							className="text-gray-700 block px-4 py-2 text-md active:bg-gray-100 active:text-gray-900"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-1"
						>
							Your bookmarks
						</Link>
						<Link
							to={`/blogs/${username}/drafts`}
							className="text-gray-700 block px-4 py-2 text-md active:bg-gray-100 active:text-gray-900"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-2"
						>
							Your drafts
						</Link>
						<form onSubmit={handleLogout}>
							<button
								type="submit"
								className="text-gray-700 block w-full px-4 py-2 text-left text-md"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-3"
							>
								Logout
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
