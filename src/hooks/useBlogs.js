import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogsContext } from './useBlogContext';
import { useAuthContext } from './useAuthContext';
const URL = 'http://localhost:4000/api';

export const useBlogs = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();

	const getAllBlogs = async () => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${URL}/blogs`);
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		} else {
			dispatch({ type: 'GetBlogs', payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const getUserBlogs = async () => {
		setIsLoading(true);
		setError(null);
		console.log('user', user.userId);
		const response = await fetch(`${URL}/blogs/user/${user?.userId}`, {
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user?.accessToken}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: 'GetBlogs', payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const deleteBlog = async (id) => {
		const response = await fetch(`${URL}/blogs/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user?.accessToken}`,
			},
		});

		const data = response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: 'DeleteBlog', payload: id });
			setIsLoading(false);
			setError(null);
		}

		getUserBlogs();
	};

	const createBlog = async (title, body) => {
		const response = await fetch('http://localhost:4000/api/blogs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user?.accessToken}`,
			},
			body: JSON.stringify({
				title,
				body,
			}),
		});
		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: 'AddBlog', payload: { data } });
			setIsLoading(false);
			setError(null);
			navigate('/');
		}
	};

	const updateBlog = async (id, blog) => {
		const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${user?.accessToken}`,
			},
			body: JSON.stringify(blog),
		});
		const data = await response.json();

		if (!response.ok) {
			setError(data.error);
			setIsLoading(false);
		} else {
			dispatch({ type: 'UpdateBlog', payload: { data } });
			setError(null);
			setIsLoading(false);
		}

		getAllBlogs();
	};

	return {
		getAllBlogs,
		getUserBlogs,
		deleteBlog,
		createBlog,
		updateBlog,
		isLoading,
		error,
	};
};
