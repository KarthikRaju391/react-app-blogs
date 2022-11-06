import React, { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogsContext } from "../hooks/useBlogContext";
import { NoContent } from "../components/NoContent";
import { useBlogs } from "../hooks/useBlogs";
import { useUserBookmarks } from "../hooks/useUserBookmarks";

export const UserBookmarks = () => {
	const { user } = useAuthContext();
	const { getUserBookmarks, isLoading, error } = useUserBookmarks();
	const { userBookmarks, dispatch } = useBlogsContext();
	const [subscribed, setIsSubscribed] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		setIsSubscribed(true);
		subscribed && user && getUserBookmarks();

		return () => {
			setIsSubscribed(false);
		};
	}, [user, dispatch, subscribed]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = userBookmarks?.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>Unable to get the data...</div>}
				{isLoading ? (
					<Loading subtitle={"Loading your bookmarks..."} />
				) : (
					userBookmarks &&
					userBookmarks.length !== 0 && (
						<BlogList
							blogs={currentPosts}
							deleteable={false}
							title="Your Bookmarks"
							blogsType="Your Bookmarks"
						/>
					)
				)}
				{!isLoading && userBookmarks && userBookmarks.length === 0 && (
					<NoContent content="Bookmark blogs to see them here..." />
				)}
				{!isLoading && userBookmarks && userBookmarks.length > 5 && (
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={userBookmarks?.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
				)}
			</div>
			{userBookmarks && (
				<div className="mt-[3.25em]">
					<AuthorList />
					<CategoryList />
				</div>
			)}
		</>
	);
};
