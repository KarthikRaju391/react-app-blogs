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
			<FontAwesomeIcon className="fa-spin text-5xl" icon={faCircleNotch} />
			<p className="text-lg font-medium">{subtitle}</p>
		</div>
	);
};
