import React from "react";

export const NoContent = ({ content }) => {
	return (
		<div className="mt-10 flex items-center">
			<h1 className="text-3xl">{content}</h1>
		</div>
	);
};
