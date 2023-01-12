import { useState } from "react";
import { useBlogsContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useUserLikes = () => {
	const URL = import.meta.env.VITE_APP_URL;
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();

	const getUserLikes = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs`);

		const data = await response.json();

		const likes = data.filter((blog) => {
			return blog.likes.includes(user?.userId);
		});

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserLikes", payload: likes });
			setIsLoading(false);
			setError(null);
		}
	};
	return {
		isLoading,
		error,
		getUserLikes,
	};
};
