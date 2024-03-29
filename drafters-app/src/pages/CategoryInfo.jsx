import React, { useEffect, useState } from "react";
import { BlogList } from "../components/BlogList";
import { useBlogsContext } from "../hooks/useBlogContext";
import AuthorList from "../components/AuthorList";
import CategoryList from "../components/CategoryList";
import { useLocation } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import { NoContent } from "../components/NoContent";
import { Loading } from "../components/Loading";
import { useCategory } from "../hooks/useCategory";

export const CategoryInfo = () => {
	const { getCategoryBlogs, isLoading, error } = useCategory();
	const { categoryBlogs, dispatch } = useBlogsContext();
	const [subscribed, setIsSubsribed] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);
	const path = useLocation();

	const categoryName = path.pathname.split("/")[3];
	useEffect(() => {
		setIsSubsribed(true);

		subscribed && getCategoryBlogs(categoryName);

		return () => {
			setIsSubsribed(false);
		};
	}, [dispatch, subscribed, categoryName]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = categoryBlogs?.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className="home col-span-2 mt-10 md:w-3/4 md:mx-auto">
				{error && <div>unable to get the data...</div>}
				{isLoading ? (
					<Loading subtitle={`Loading ${categoryName} Blogs...`} />
				) : (
					categoryBlogs &&
					categoryBlogs.length !== 0 && (
						<BlogList
							blogs={currentPosts}
							deleteable={false}
							title={`${categoryName} Blogs`}
							blogsType="Category Blogs"
						/>
					)
				)}
				{!isLoading && categoryBlogs && categoryBlogs.length === 0 && (
					<NoContent content="No recent blogs in this category..." />
				)}
				{!isLoading && categoryBlogs && categoryBlogs.length >= 5 && (
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={categoryBlogs?.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
				)}
			</div>
			{categoryBlogs && (
				<div className="mt-[3.25em]">
					<AuthorList />
					<CategoryList />
				</div>
			)}
		</>
	);
};
