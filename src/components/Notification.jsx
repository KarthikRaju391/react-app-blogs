import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useBlogsContext } from "../hooks/useBlogContext";

export const Notification = ({ success, error, message }) => {
	return (
		<div
			className={`flex justify-center gap-x-2 items-center rounded py-4 px-3 ${
				success && `bg-green-200 border-green-600`
			} ${
				error && `bg-red-200 border-red-600`
			} border-2 w-72 font-bold fixed bottom-4 right-6`}
		>
			<div>
				<FontAwesomeIcon icon={faCircleCheck} />
			</div>
			<p className="">{message}</p>
		</div>
	);
};
