import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogsContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useBlogs = () => {
	const URL = "http://localhost:4000/api";
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useBlogsContext();
	const { user, userId } = useAuthContext();
	const location = useLocation();
	const path = location.pathname.split("/")[3];

	const getAllBlogs = async () => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${URL}/blogs`);
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		} else {
			localStorage.setItem("blogs", JSON.stringify(data));
			dispatch({ type: "GetBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const getUserDrafts = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs/drafts/user/${user?.userId}`, {
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
		});
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserDrafts", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const getUserLikes = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs`);

		const data = await response.json();

		const likes = data.filter((blog) => {
			return blog.likes.includes(user?.userId);
		});

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserLikes", payload: likes });
			setIsLoading(false);
			setError(null);
		}
	};

	const getUserBlogs = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs/user/${user?.userId}`, {
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
		});

		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const getAuthorBlogs = async (authorName) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${URL}/blogs?author=${authorName}`);
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetAuthorBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const getCategoryBlogs = async (category) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${URL}/blogs?category=${category}`);
		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetCategoryBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const getUserBookmarks = async () => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(`${URL}/blogs`);

		const data = await response.json();

		const bookmarks = data.filter((blog) => {
			return blog.bookmark.includes(user?.userId);
		});

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "GetUserBookmarks", payload: bookmarks });
			setIsLoading(false);
			setError(null);
		}
	};

	const deleteBlog = async (id) => {
		const response = await fetch(`${URL}/blogs/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
		});

		const data = response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
		}

		if (response.ok) {
			dispatch({ type: "DeleteBlog", payload: id });
			notifyDeleteBlog();
			setIsLoading(false);
			setError(null);
		}

		getUserBlogs();
	};

	const notifyLoadingState = () => {
		dispatch({ type: "NotifyLoadingStart", payload: "Loading..." });
	};

	const notifyDeleteBlog = () => {
		dispatch({
			type: "NotifyDeleteStart",
			payload: "Blog deleted successfully!",
		});
		setTimeout(() => {
			dispatch({ type: "NotifyDeleteStop" });
		}, 2500);
	};

	const createBlog = async (title, body, category, draft) => {
		const response = await fetch("http://localhost:4000/api/blogs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
			body: JSON.stringify({
				title,
				body,
				category,
				draft,
			}),
		});
		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			draft === true ? notifyCreateBlog(true) : notifyCreateBlog(false);
			if (data === "Blog validation failed") {
				setError("Please enter title and content...");
			}
		}

		if (response.ok) {
			dispatch({ type: "AddBlog", payload: { data } });
			notifyCreateBlog();
			setIsLoading(false);
			setError(null);
			navigate("/");
		}
	};

	const notifyCreateBlog = (createDraft) => {
		createDraft
			? dispatch({
					type: "NotifyCreateStart",
					payload: "Draft created successfully!",
			  })
			: dispatch({
					type: "NotifyCreateStart",
					payload: "Blog created successfully!",
			  });
		setTimeout(() => {
			dispatch({ type: "NotifyCreateStop" });
		}, 2500);
	};

	const notifyLikeUpdate = (addLike) => {
		if (addLike === true) {
			console.log("here too");
			dispatch({
				type: "NotifyLikeStart",
				payload: "Added blog to your likes!",
			});
		} else {
			dispatch({
				type: "NotifyLikeStart",
				payload: "Removed blog from your likes...",
			});
		}
		setTimeout(() => {
			dispatch({
				type: "NotifyLikeStop",
			});
		}, 2500);
	};

	const notifyUpdateBlog = (bookmarkAddUpdate) => {
		if (bookmarkAddUpdate === undefined) {
			dispatch({
				type: "NotifyUpdateStart",
				payload: "Blog updated successfully!",
			});
		} else if (bookmarkAddUpdate) {
			dispatch({
				type: "NotifyUpdateStart",
				payload: "Bookmark added successfully!",
			});
		} else {
			dispatch({
				type: "NotifyUpdateStart",
				payload: "Bookmark removed successfully!",
			});
			path === "bookmarks" && getUserBookmarks();
		}
		setTimeout(() => {
			dispatch({ type: "NotifyUpdateStop" });
		}, 2500);
	};

	const updateBlog = async (
		id,
		blog,
		newUpdate,
		bookmarkAddUpdate,
		likeUpdate,
		viewsUpdate
	) => {
		const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
			body: JSON.stringify(blog),
		});
		const data = await response.json();

		if (!response.ok) {
			setError(data.error);
			setIsLoading(false);
		} else {
			if (likeUpdate.likeAdd === true) {
				console.log("here");
				notifyLikeUpdate(true);
			} else if (likeUpdate.likeAdd === true) {
				notifyLikeUpdate(false);
			}
			dispatch({ type: "UpdateBlog", payload: { data } });
			!viewsUpdate && !newUpdate && notifyUpdateBlog(bookmarkAddUpdate);
			newUpdate && notifyUpdateBlog();
			setError(null);
			setIsLoading(false);
			newUpdate && navigate("/");
		}

		getAllBlogs();
	};

	return {
		getAllBlogs,
		getAuthorBlogs,
		getCategoryBlogs,
		getUserBlogs,
		getUserDrafts,
		getUserBookmarks,
		notifyCreateBlog,
		getUserLikes,
		deleteBlog,
		createBlog,
		updateBlog,
		isLoading,
		error,
	};
};
