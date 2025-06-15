import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const CategoryList = () => {
	const categories = [
		{ name: "Personal", color: "from-gray-500 to-gray-600", icon: "👤" },
		{ name: "Tech", color: "from-red-500 to-red-600", icon: "💻" },
		{ name: "Self-help", color: "from-green-500 to-green-600", icon: "🌱" },
		{ name: "Entertainment", color: "from-blue-500 to-blue-600", icon: "🎬" },
		{ name: "Lifestyle", color: "from-purple-500 to-purple-600", icon: "✨" },
	];

	return (
		<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-2xl transition-all duration-300">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
				<h2 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h2>
			</div>
			
			<div className="space-y-3">
				{categories.map((category, index) => (
					<Link
						to={`/blogs/category/${category.name}`}
						key={index}
						className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
					>
						<div className="flex items-center space-x-3">
							<div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
								{index + 1}
							</div>
							<div className="flex items-center space-x-2">
								<span className="text-lg">{category.icon}</span>
								<span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
									{category.name}
								</span>
							</div>
						</div>
						<div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CategoryList;