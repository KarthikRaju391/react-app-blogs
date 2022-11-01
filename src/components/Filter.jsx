import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBlogsContext } from "../hooks/useBlogContext";
import { useBlogs } from "../hooks/useBlogs";

import {
	faSliders,
	faArrowDownShortWide,
	faArrowDownWideShort,
	faArrowDown19,
	faArrowDown91,
} from "@fortawesome/free-solid-svg-icons";

export const Filter = ({ username }) => {
	const [open, setOpen] = useState(false);
	const { dispatch } = useBlogsContext();

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

	const handleOldestFirst = () => {
		dispatch({ type: "SortBlogsOldestFirst" });
	};

	const handleLatestFirst = () => {
		dispatch({ type: "SortBlogsLatestFirst" });
	};

	const handleMostLikeFirst = () => {
		dispatch({ type: "SortBlogsMostLikedFirst" });
	};

	const handleLeastLikedFirst = () => {
		dispatch({ type: "SortBlogsLeastLikedFirst" });
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
					<FontAwesomeIcon icon={faSliders} />
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
					className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabIndex="-1"
				>
					<div className="py-1" role="none">
						{/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
						<button
							type="submit"
							onClick={handleOldestFirst}
							className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2 text-left text-md"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-3"
						>
							<FontAwesomeIcon icon={faArrowDownShortWide} />
							Oldest first
						</button>
						<button
							type="submit"
							onClick={handleLatestFirst}
							className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2 text-left text-md"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-3"
						>
							<FontAwesomeIcon icon={faArrowDownWideShort} />
							Latest First
						</button>
						<button
							type="submit"
							onClick={handleMostLikeFirst}
							className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2 text-left text-md"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-3"
						>
							<FontAwesomeIcon icon={faArrowDown91} />
							Most Liked
						</button>
						<button
							type="submit"
							onClick={handleLeastLikedFirst}
							className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2 text-left text-md"
							role="menuitem"
							tabIndex="-1"
							id="menu-item-3"
						>
							<FontAwesomeIcon icon={faArrowDown19} />
							Least Liked
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

{
	/* <div className="group transition">
					<button className="dropbtn filter-btn">
						<FontAwesomeIcon
							className="cursor-pointer text-2xl"
							icon={faSliders}
						/>
					</button>
					<div className="hidden group-hover:flex flex-col rounded shadow-xl items-start bg-white absolute right-[35.25em]">
						<button
							className="group button-old flex justify-between gap-9 items-center text-lg w-full py-2 px-3 transition"
							onClick={handleClick}
						>
							<FontAwesomeIcon icon={faArrowDownShortWide} />
							<small className="">Oldest first</small>
						</button>
						<button
							className="group button-new flex justify-between items-center text-lg w-full py-2 px-3 transition"
							onClick={handleClick}
						>
							<FontAwesomeIcon icon={faArrowDownWideShort} />
							<small className="">Latest first</small>
						</button>
						<button
							className="group button-most flex justify-between items-center text-lg w-full py-2 px-3 transition"
							onClick={handleClick}
						>
							<FontAwesomeIcon icon={faArrowDown91} />
							<small className="">Most liked</small>
						</button>
						<button
							className="group button-least flex justify-between items-center text-lg w-full py-2 px-3 transition"
							onClick={handleClick}
						>
							<FontAwesomeIcon icon={faArrowDown19} />
							<small className="">Least liked</small>
						</button>
					</div>
				</div> */
}
