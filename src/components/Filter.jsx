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

export const Filter = ({ blogsType }) => {
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
		blogsType === "All Blogs" && dispatch({ type: "SortBlogsOldestFirst" });
		blogsType === "Your Blogs" &&
			dispatch({ type: "SortUserBlogsOldestFirst" });
		blogsType === "Your Bookmarks" &&
			dispatch({ type: "SortUserBookmarksOldestFirst" });
		blogsType === "Your Drafts" &&
			dispatch({ type: "SortUserDraftsOldestFirst" });
		blogsType === "Your Likes" &&
			dispatch({ type: "SortUserLikesOldestFirst" });
		blogsType === "Author Blogs" &&
			dispatch({ type: "SortAuthorBlogsOldestFirst" });
		blogsType === "Category Blogs" &&
			dispatch({ type: "SortCategoryBlogsOldestFirst" });
	};

	const handleLatestFirst = () => {
		blogsType === "All Blogs" && dispatch({ type: "SortBlogsLatestFirst" });
		blogsType === "Your Blogs" &&
			dispatch({ type: "SortUserBlogsLatestFirst" });
		blogsType === "Your Bookmarks" &&
			dispatch({ type: "SortUserBookmarksLatestFirst" });
		blogsType === "Your Drafts" &&
			dispatch({ type: "SortUserDraftsLatestFirst" });
		blogsType === "Your Likes" &&
			dispatch({ type: "SortUserLikesLatestFirst" });
		blogsType === "Author Blogs" &&
			dispatch({ type: "SortAuthorBlogsLatestFirst" });
		blogsType === "Category Blogs" &&
			dispatch({ type: "SortCategoryBlogsLatestFirst" });
	};

	const handleMostLikedFirst = () => {
		blogsType === "All Blogs" &&
			dispatch({ type: "SortBlogsMostLikedFirst" });
		blogsType === "Your Blogs" &&
			dispatch({ type: "SortUserBlogsMostLikedFirst" });
		blogsType === "Your Bookmarks" &&
			dispatch({ type: "SortUserBookmarksMostLikedFirst" });
		blogsType === "Your Drafts" &&
			dispatch({ type: "SortUserDraftsMostLikedFirst" });
		blogsType === "Your Likes" &&
			dispatch({ type: "SortUserLikesMostLikedFirst" });
		blogsType === "Author Blogs" &&
			dispatch({ type: "SortAuthorBlogsMostLikedFirst" });
		blogsType === "Category Blogs" &&
			dispatch({ type: "SortCategoryBlogsMostLikedFirst" });
	};

	const handleLeastLikedFirst = () => {
		blogsType === "All Blogs" &&
			dispatch({ type: "SortBlogsLeastLikedFirst" });
		blogsType === "Your Blogs" &&
			dispatch({ type: "SortUserBlogsLeastLikedFirst" });
		blogsType === "Your Bookmarks" &&
			dispatch({ type: "SortUserBookmarksLeastLikedFirst" });
		blogsType === "Your Drafts" &&
			dispatch({ type: "SortUserDraftsLeastLikedFirst" });
		blogsType === "Your Likes" &&
			dispatch({ type: "SortUserLikesLeastLikedFirst" });
		blogsType === "Author Blogs" &&
			dispatch({ type: "SortAuthorBlogsLeastLikedFirst" });
		blogsType === "Category Blogs" &&
			dispatch({ type: "SortCategoryBlogsLeastLikedFirst" });
	};

	const handleMostViewedFirst = () => {
		blogsType === "All Blogs" &&
			dispatch({ type: "SortBlogsMostViewedFirst" });
		blogsType === "Your Blogs" &&
			dispatch({ type: "SortUserBlogsMostViewedFirst" });
		blogsType === "Your Bookmarks" &&
			dispatch({ type: "SortUserBookmarksMostViewedFirst" });
		blogsType === "Your Drafts" &&
			dispatch({ type: "SortUserDraftsMostViewedFirst" });
		blogsType === "Your Likes" &&
			dispatch({ type: "SortUserLikesMostViewedFirst" });
		blogsType === "Author Blogs" &&
			dispatch({ type: "SortAuthorBlogsMostViewedFirst" });
		blogsType === "Category Blogs" &&
			dispatch({ type: "SortCategoryBlogsMostViewedFirst" });
	};

	const handleLeastViewedFirst = () => {
		blogsType === "All Blogs" &&
			dispatch({ type: "SortBlogsLeastViewedFirst" });
		blogsType === "Your Blogs" &&
			dispatch({ type: "SortUserBlogsLeastViewedFirst" });
		blogsType === "Your Bookmarks" &&
			dispatch({ type: "SortUserBookmarksLeastViewedFirst" });
		blogsType === "Your Drafts" &&
			dispatch({ type: "SortUserDraftsLeastViewedFirst" });
		blogsType === "Your Likes" &&
			dispatch({ type: "SortUserLikesLeastViewedFirst" });
		blogsType === "Author Blogs" &&
			dispatch({ type: "SortAuthorBlogsLeastViewedFirst" });
		blogsType === "Category Blogs" &&
			dispatch({ type: "SortCategoryBlogsLeastViewedFirst" });
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
					className=" focus:animate-closeDropdown absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabIndex="-1"
				>
					<div
						className="py-1 flex justify-between items-center"
						role="none"
					>
						<div className="w-44">
							<button
								type="submit"
								onClick={handleOldestFirst}
								className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2  text-md"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-3"
							>
								<FontAwesomeIcon icon={faArrowDownShortWide} />
								Oldest first
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
							<button
								type="submit"
								onClick={handleLeastViewedFirst}
								className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2 text-left text-md"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-3"
							>
								<FontAwesomeIcon icon={faArrowDown19} />
								Least Viewed
							</button>
						</div>
						<div className="w-44">
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
								onClick={handleMostLikedFirst}
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
								onClick={handleMostViewedFirst}
								className="hover:border-l-4 focus:border-l-4 border-gray-800 transition-all duration-100 text-gray-700 flex justify-between items-center w-full px-4 py-2 text-left text-md"
								role="menuitem"
								tabIndex="-1"
								id="menu-item-3"
							>
								<FontAwesomeIcon icon={faArrowDown91} />
								Most Viewed
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
