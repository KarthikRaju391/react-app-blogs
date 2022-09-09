import React, { useEffect, useState } from 'react';
import { BlogList } from './BlogList';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBlogsContext } from '../hooks/useBlogContext';
import { useBlogs } from '../hooks/useBlogs';

export const UserBlogs = () => {
	const { user } = useAuthContext();
	const { getUserBlogs, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();

	useEffect(() => {
		user && getUserBlogs();
		//TODO: get the latest blogs by the user
	}, [dispatch, user]);

	return (
		<div className="home">
			{error && <div>Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList blogs={blogs} deleteable={true} title="Your Blogs" />
			)}
		</div>
	);
};
