import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useLocation } from "react-router-dom";

export const Loading = ({ subtitle }) => {
	const location = useLocation();
	const path = location.pathname;
	const curPath = path.split("/")[1];

	return (
		<div
			className={`home col-span-2 grid place-items-center ${
				curPath === "auth" ? `mt-4` : `mt-52`
			} md:w-3/4 md:mx-auto`}
		>
			<div className="flex flex-col items-center space-y-4">
				<div className="relative">
					<div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
					<div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
				</div>
				<p className="text-lg font-medium text-gray-700 dark:text-gray-300 text-center">
					{subtitle}
				</p>
			</div>
		</div>
	);
};