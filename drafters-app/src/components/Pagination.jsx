import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
	postsPerPage,
	totalPosts,
	currentPage,
	paginate,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const handleIncrement = () => {
		const nextPage = currentPage + 1;
		if (nextPage > pageNumbers.length) {
			paginate(1);
		} else {
			paginate(nextPage);
		}
	};

	const handleDecrement = () => {
		const prevPage = currentPage - 1;
		if (prevPage <= 0) {
			paginate(pageNumbers.length);
		} else {
			paginate(prevPage);
		}
	};

	return (
		<nav className="flex justify-center mt-5">
			<ul className="flex gap-x-2 items-center ">
				{/* className="absolute left-[3em] top-2/3" */}
				<FontAwesomeIcon
					onClick={handleDecrement}
					className="hover:-translate-x-1 cursor-pointer transition text-2xl"
					icon={faAngleLeft}
				/>
				<p className="text-2xl font-medium">{currentPage}</p>
				{/* className="absolute right-[25em] top-2/3" */}
				<FontAwesomeIcon
					onClick={handleIncrement}
					className="hover:translate-x-1 cursor-pointer transition text-2xl"
					icon={faAngleRight}
				/>

				{/* NUMBERED PAGINATION */}
				{/* {pageNumbers.map((number) => (
					<Link
						key={number}
						className="px-3 hover:bg-gray-900 transition hover:text-white cursor-pointer"
						onClick={() => paginate(number)}
						to=""
					>
						{number}
					</Link>
				))} */}
			</ul>
		</nav>
	);
};
