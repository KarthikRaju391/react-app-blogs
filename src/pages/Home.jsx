import { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useBlogs } from "../hooks/useBlogs";
import { useBlogsContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar } from "../components/Navbar";
import AuthorList from "../components/AuthorList";

export const Home = () => {
	const { getAllBlogs, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();
	const { user } = useAuthContext();
	useEffect(() => {
		getAllBlogs();
	}, [dispatch]);

	return (
		<>
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>'Unable to get the data...</div>}
				{isLoading && <div>Almost there...</div>}
				{blogs && (
					<BlogList blogs={blogs} deleteable={false} title="All Blogs" />
				)}
			</div>
			<AuthorList />
		</>
	);
};
