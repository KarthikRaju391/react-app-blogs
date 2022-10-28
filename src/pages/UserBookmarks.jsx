import React, { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogsContext } from "../hooks/useBlogContext";
import { useBlogs } from "../hooks/useBlogs";

export const UserBookmarks = () => {
	const { user } = useAuthContext();
	const { getUserBookmarks, isLoading, error } = useBlogs();
	const { blogs, dispatch } = useBlogsContext();
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	//TODO: Take care removing of bookmarks UI
	useEffect(() => {
		user && getUserBookmarks();
	}, [user, dispatch]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = blogs?.slice(indexOfFirstPost, indexOfLastPost);

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
					blogs && (
						<BlogList
							blogs={currentPosts}
							deleteable={false}
							title="Your Bookmarks"
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
