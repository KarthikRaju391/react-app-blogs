import React, { useEffect } from "react";
import { BlogList } from "../components/BlogList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogsContext } from "../hooks/useBlogContext";
import { useBlogs } from "../hooks/useBlogs";

export const UserDrafts = () => {
	const { user } = useAuthContext();
	const { getUserDrafts, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();

	useEffect(() => {
		user && getUserDrafts();
	}, [dispatch, user]);

	return (
		<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
			{error && <div>unable to get the data...</div>}
			{isLoading && <div>almost there...</div>}
			{blogs && (
				<BlogList blogs={blogs} deleteable={true} title="Your drafts" />
			)}
		</div>
	);
};
