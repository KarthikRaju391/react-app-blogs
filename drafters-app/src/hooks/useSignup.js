import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();
	const URL = import.meta.env.VITE_APP_URL;

	const signup = async (user) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(
			`${URL}/auth/signup`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			// save the user to local storage
			localStorage.setItem("user", JSON.stringify(data));

			dispatch({ type: "LOGIN", payload: data });
			setIsLoading(false);
		}
	};

	return { signup, isLoading, error };
};
