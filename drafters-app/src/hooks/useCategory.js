import { useState } from "react";
import { useBlogsContext } from "./useBlogContext";

export const useCategory = () => {
	const URL = import.meta.env.VITE_APP_URL;
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();

	const getCategoryBlogs = async (category) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${URL}/blogs?category=${category}`);
		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetCategoryBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	return {
		isLoading,
		error,
		getCategoryBlogs,
	};
};
