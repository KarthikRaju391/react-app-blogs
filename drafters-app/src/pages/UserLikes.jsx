import React, { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogsContext } from "../hooks/useBlogContext";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";
import { Pagination } from "../components/Pagination";
import { NoContent } from "../components/NoContent";
import { Loading } from "../components/Loading";
import { useUserLikes } from "../hooks/useUserLikes";

export const UserLikes = () => {
	const { user } = useAuthContext();
	const { getUserLikes, isLoading, error } = useUserLikes();
	const { userLikes, dispatch } = useBlogsContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [subscribed, setIsSubscribed] = useState(false);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		setIsSubscribed(true);
		subscribed && user && getUserLikes();

		return () => {
			setIsSubscribed(false);
		};
	}, [dispatch, user, subscribed]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = userLikes?.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>unable to get the data...</div>}
				{isLoading ? (
					<Loading subtitle={"Loading your liked blogs..."} />
				) : (
					userLikes &&
					userLikes.length !== 0 && (
						<BlogList
							blogs={currentPosts}
							deleteable={false}
							title="Your Likes"
							blogsType="Your Likes"
						/>
					)
				)}
				{!isLoading && userLikes && userLikes.length === 0 && (
					<NoContent content="Please like blogs to see them here..." />
				)}
				{!isLoading && userLikes && userLikes.length > 5 && (
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={userLikes?.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
				)}
			</div>
			{userLikes && (
				<div className="mt-[3.25em]">
					<AuthorList />
					<CategoryList />
				</div>
			)}
		</>
	);
};
