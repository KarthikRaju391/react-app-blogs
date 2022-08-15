import React, { useEffect, useState } from 'react';
import { BlogList } from './BlogList';
import { useAuthContext } from '../hooks/useAuthContext';

export const UserBlogs = () => {
	const { user } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [blogs, setBlogs] = useState(null);

	useEffect(() => {
		let unsubscribed = false;

		//todo: get the latest blogs by the user
		const fetchUserBlogs = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/api/blogs/user/${user.userId}`,
					{
						headers: {
							'Content-Type': 'application/json',
							token: `Bearer ${user?.accessToken}`,
						},
					}
				);
				const data = await response.json();
				if (!unsubscribed) {
					setError(null);
					setBlogs(data);
					setIsLoading(false);
				}
			} catch (error) {
				if (!unsubscribed) {
					setError(error);
					setIsLoading(false);
				}
			}
		};
		fetchUserBlogs();
		return () => {
			unsubscribed = true;
		};
	}, [user?.accessToken, user?.userId]);

	return (
		<div className="home">
			{error && <div>Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList
					deleteable={true}
					setBlogs={setBlogs}
					blogs={blogs}
					title="Your Blogs"
				/>
			)}
		</div>
	);
};
