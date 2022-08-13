import { useEffect, useState } from 'react';
import { BlogList } from '../components/BlogList';
import { useBlogsContext } from '../hooks/useBlogsContext';
import useFetch from '../hooks/useFetch';
import { publicRequest } from '../requestMethods';

export const Home = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [error, setError] = useState(false);
	const { blogs, dispatch } = useBlogsContext();
	useEffect(() => {
		let unsubscribed = false;
		const fetchBlogs = async () => {
			const response = await publicRequest.get('blogs');
			const data = await response.data;
			if (!data) {
				setError(true);
			}
			if (data && !unsubscribed) {
				dispatch({ type: 'SET_BLOGS', payload: data });
				setIsLoading(false);
			}
		};

		fetchBlogs();

		return () => {
			unsubscribed = true;
		};
	}, [dispatch]);

	return (
		<div className="home">
			{error && <div>'Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList deleteable={false} blogs={blogs} title="All Blogs" />
			)}
		</div>
	);
};
