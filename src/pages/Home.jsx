import { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useBlogs } from "../hooks/useBlogs";
import { useBlogsContext } from "../hooks/useBlogContext";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";

export const Home = () => {
	const { getAllBlogs, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();
	const [subscribed, setIsSubscribed] = useState(false);

	useEffect(() => {
		setIsSubscribed(true);
		subscribed && getAllBlogs();

		return () => {
			setIsSubscribed(false);
		};
	}, [dispatch, subscribed]);

	return (
		<>
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>'Unable to get the data...</div>}
				{isLoading && <div>Almost there...</div>}
				{blogs && (
					<BlogList blogs={blogs} deleteable={false} title="All Blogs" />
				)}
				{blogs && blogs.length > 5 && (
					<button className="mt-5 bg-gray-800 hover:bg-gray-900 transition-all text-white px-3 py-2 rounded mx-auto">
						Next
					</button>
				)}
			</div>
			{blogs && (
				<div className="mt-[3.25em]">
					<AuthorList />
					<CategoryList />
				</div>
			)}
		</>
	);
};
