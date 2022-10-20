import React, { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogsContext } from "../hooks/useBlogContext";
import { useBlogs } from "../hooks/useBlogs";

export const UserBookmarks = () => {
	const { user } = useAuthContext();
	const { getUserBookmarks, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();

	useEffect(() => {
		user && getUserBookmarks();
	}, [user, dispatch]);

	return (
		<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
			{error && <div>Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList blogs={blogs} deleteable={false} title="Your Bookmarks" />
			)}
		</div>
	);
};
