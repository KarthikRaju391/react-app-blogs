import React from "react";
import { Link } from "react-router-dom";

const CategoryList = () => {
	const categories = [
		"Personal",
		"Tech",
		"Self-Help",
		"Entertainment",
		"Lifestyle",
	];

	return (
		<div className="mt-11 w-3/4 mx-auto hidden lg:block border rounded-lg p-5 border-gray-200 bg-white hover:shadow-md transition-all">
			<div className="flex gap-2 items-center">
				<span className="bg-teal-800 h-6 w-1"></span>
				<h2 className="text-2xl font-medium">Categories</h2>
			</div>
			<ul>
				{categories &&
					categories.map((category, index) => (
						<Link to="" className="mt-2 block" key={index}>
							<span>{index + 1}. </span>
							{category}
						</Link>
					))}
			</ul>
		</div>
	);
};

export default CategoryList;
