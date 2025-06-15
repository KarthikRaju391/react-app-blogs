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
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>'Unable to get the data...</div>}
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
			{blogs && (
				<div className="mt-[3.25em]">
					<AuthorList />
					<CategoryList />
				</div>
			)}
		</>
	);
};
