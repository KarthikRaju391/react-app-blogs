import { useEffect, useState } from 'react';
import { BlogList } from '../components/BlogList';
import { useBlogs } from '../hooks/useBlogs';
import { useBlogsContext } from '../hooks/useBlogContext';
import { useAuthContext } from '../hooks/useAuthContext';

export const Home = () => {
	const { getAllBlogs, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();

	useEffect(() => {
		getAllBlogs();
	}, [dispatch]);

	return (
		<div className="home">
			{error && <div>'Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList blogs={blogs} deleteable={false} title="All Blogs" />
			)}
		</div>
	);
};
