import { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useBlogs } from "../hooks/useBlogs";
import { useBlogsContext } from "../hooks/useBlogContext";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";
import { Pagination } from "../components/Pagination";
import { Loading } from "../components/Loading";

export const Home = () => {
	const { getAllBlogs, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();
	const [subscribed, setIsSubscribed] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		setIsSubscribed(true);
		subscribed && getAllBlogs();

		return () => {
			setIsSubscribed(false);
		};
	}, [dispatch, subscribed]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = blogs?.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	
	return (
		<>
			<div className="col-span-2 lg:col-span-2">
				{error && (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
						Unable to get the data...
					</div>
				)}
				{isLoading ? (
					<Loading subtitle={"Loading all blogs..."} />
				) : (
					blogs &&
					blogs.length !== 0 && (
						<BlogList
							blogs={currentPosts}
							deleteable={false}
							title="All Blogs"
							blogsType="All Blogs"
						/>
					)
				)}
				{!isLoading && blogs && blogs.length > 5 && (
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={blogs?.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
				)}
			</div>
			
			{/* Sidebar */}
			<div className="hidden lg:block lg:col-span-1 space-y-6">
				<AuthorList />
				<CategoryList />
			</div>
		</>
	);
};