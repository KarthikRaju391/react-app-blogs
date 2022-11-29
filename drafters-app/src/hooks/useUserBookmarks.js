import { useState } from "react";
import { useBlogsContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useUserBookmarks = () => {
	const URL = "https://drafters.onrender.com/api";
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();

	const getUserBookmarks = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs`);

		const data = await response.json();

		const bookmarks = data.filter((blog) => {
			return blog.bookmark.includes(user?.userId);
		});

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserBookmarks", payload: bookmarks });
			setIsLoading(false);
			setError(null);
		}
	};

	return {
		isLoading,
		error,
		getUserBookmarks,
	};
};
