import { useState } from "react";
import { useBlogsContext } from "./useBlogContext";

export const useAuthor = () => {
	const URL = "https://drafters.onrender.com/api";
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();

	const getAuthorBlogs = async (authorName) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${URL}/blogs?author=${authorName}`);
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetAuthorBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	return {
		isLoading,
		error,
		getAuthorBlogs,
	};
};
