import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Notification = ({ success, error, loading, message }) => {
	return (
		<div
			className={`flex justify-center gap-x-2 items-center rounded py-4 px-3 ${
				success && `bg-green-200 border-green-600`
			} ${error && `bg-red-200 border-red-600`} ${
				loading && `bg-yellow-100 border-yellow-500`
			} border-2 w-80 font-bold md:fixed md:bottom-4 md:right-6`}
		>
			<div>
				{success && (
					<FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />
				)}
				{loading && (
					<FontAwesomeIcon
						className="fa-spin text-2xl"
						icon={faCircleNotch}
					/>
				)}
				{error && <FontAwesomeIcon className="text-2xl" icon={faXmark} />}
			</div>
			<p>{message}</p>
		</div>
	);
};
