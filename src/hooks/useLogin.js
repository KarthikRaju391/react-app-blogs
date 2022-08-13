import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const login = async (username, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch('http://localhost:4000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			// save the user to local storage
			localStorage.setItem('user', JSON.stringify(data));

			dispatch({ type: 'LOGIN', payload: data });
			setIsLoading(false);
		}
	};

	return { login, loginIsLoading: isLoading, loginError: error };
};