import { useState } from "react";
import { useBlogsContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useUserDrafts = () => {
	const URL = import.meta.env.VITE_APP_URL;
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();

	const getUserDrafts = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs/drafts/user/${user?.userId}`, {
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
		});
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserDrafts", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	return {
		isLoading,
		error,
		getUserDrafts,
	};
};
