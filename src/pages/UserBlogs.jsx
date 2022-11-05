import React, { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogsContext } from "../hooks/useBlogContext";
import { useBlogs } from "../hooks/useBlogs";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";
import { Pagination } from "../components/Pagination";
import { NoContent } from "../components/NoContent";
import { Loading } from "../components/Loading";

export const UserBlogs = () => {
	const { user } = useAuthContext();
	const { getUserBlogs, isLoading, error } = useBlogs();
	const { userBlogs, dispatch } = useBlogsContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [subscribed, setIsSubscribed] = useState(false);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		setIsSubscribed(true);
		subscribed && user && getUserBlogs();

		return () => {
			setIsSubscribed(false);
		};
	}, [dispatch, user, subscribed]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = userBlogs?.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>unable to get the data...</div>}
				{isLoading ? (
					<Loading subtitle={"Loading your userBlogs..."} />
				) : (
					userBlogs &&
					userBlogs.length !== 0 && (
						<BlogList
							userBlogs={currentPosts}
							deleteable={true}
							title="Your userBlogs"
						/>
					)
				)}
				{!isLoading && userBlogs && userBlogs.length === 0 && (
					<NoContent content="Please write blogs to see them here..." />
				)}
				{!isLoading && userBlogs && userBlogs.length > 5 && (
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={userBlogs?.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
				)}
			</div>
			{userBlogs && (
				<div className="mt-[3.25em]">
					<AuthorList />
					<CategoryList />
				</div>
			)}
		</>
	);
};
