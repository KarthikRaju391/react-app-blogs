import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const useFetch = (url, token) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const { user } = useAuthContext();
	useEffect(() => {
		if (token) {
			fetch(`http://localhost:4000/api/${url}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: `Bearer ${user?.accessToken}`,
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw Error('Unable to get the data...');
					}
					return res.json();
				})
				.then((data) => {
					setData(data);
					setIsLoading(false);
					setError(null);
				})
				.catch((err) => {
					setIsLoading(false);
					setError(err.message);
				});
		} else {
			fetch(`http://localhost:4000/api/${url}`)
				.then((res) => {
					if (!res.ok) {
						throw Error('Unable to get the data...');
					}
					return res.json();
				})
				.then((data) => {
					setData(data);
					setIsLoading(false);
					setError(null);
				})
				.catch((err) => {
					setIsLoading(false);
					setError(err.message);
				});
		}
	}, [url, token]);

	return { data, isLoading, error };
};

export default useFetch;
