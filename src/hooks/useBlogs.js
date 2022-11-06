import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogsContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";
import { useNotification } from "./useNotification";

export const useBlogs = () => {
	const URL = "http://localhost:4000/api";
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [updateError, setUpdateError] = useState(null);
	const [createError, setCreateError] = useState(null);
	const [deleteError, setDeleteError] = useState(null);
	const [updateLoading, setUpdateLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(true);
	const [deleteLoading, setDeleteLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const { dispatch } = useBlogsContext();
	const { user } = useAuthContext();
	// const { getUserDrafts } = useUserDrafts();
	// const { getUserBlogs } = useUserBlogs();
	const {
		notifyCreateBlog,
		notifyDeleteBlog,
		notifyLikeUpdate,
		notifyLoadingState,
		notifyUpdateBlog,
		notifyError,
	} = useNotification();

	const getAllBlogs = async () => {
		const response = await fetch(`${URL}/blogs`);
		const data = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(data.error);
			notifyError();
		} else {
			localStorage.setItem("blogs", JSON.stringify(data));
			dispatch({ type: "GetBlogs", payload: data });
			setIsLoading(false);
			setError(null);
		}
	};

	const deleteBlog = async (id, notify, pathName) => {
		setDeleteLoading((prev) => !prev);
		deleteLoading && notify === false
			? notifyLoadingState(true, false, false, false)
			: notifyLoadingState(false, false, false, true);

		const response = await fetch(`${URL}/blogs/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				token: `Bearer ${user?.accessToken}`,
			},
		});

		const data = response.json();

		if (!response.ok) {
			setDeleteLoading(false);
			setDeleteError(data.error);
			notifyError(false, false, true);
		}

		if (response.ok) {
			setDeleteLoading((prev) => !prev);
			notify === true &&
				pathName === "drafts" &&
				dispatch({
					type: "DeleteBlog",
					payload: { id: id, source: pathName },
				});

			notify === true &&
				pathName === "user" &&
				dispatch({
					type: "DeleteBlog",
					payload: { id: id, source: pathName },
				});
			notify === true && pathName !== "none" && notifyDeleteBlog();
			setDeleteError(null);
		}
	};

	const createBlog = async (title, body, category, draft) => {
		setCreateLoading((prev) => !prev);
		createLoading && notifyLoadingState(true, draft, false, false);

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
			setCreateLoading((prev) => !prev);
			if (data === "Blog validation failed") {
				setCreateError("Please enter title and content...");
				notifyError(true, false, false);
			}
		}

		if (response.ok) {
			setCreateLoading((prev) => !prev);
			draft === true ? notifyCreateBlog(true) : notifyCreateBlog(false);
			dispatch({ type: "AddBlog", payload: { data } });
			setCreateError(null);
			navigate("/");
		}
	};

	const updateBlog = async (
		id,
		blog,
		newUpdate,
		bookmarkAddUpdate,
		likeUpdate,
		viewsUpdate
	) => {
		setUpdateLoading((prev) => !prev);
		updateLoading &&
			!viewsUpdate &&
			notifyLoadingState(false, false, true, false);

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
			setUpdateError(data.error);
			setUpdateLoading((prev) => !prev);
			notifyError(false, true, false);
		} else {
			setUpdateLoading(false);
			if (likeUpdate.likeAdd === true) {
				notifyLikeUpdate(true);
			} else if (likeUpdate.likeAdd === true) {
				notifyLikeUpdate(false);
			}

			dispatch({ type: "UpdateBlog", payload: { data } });
			!viewsUpdate && !newUpdate && notifyUpdateBlog(bookmarkAddUpdate);
			!viewsUpdate && newUpdate && notifyUpdateBlog();
			setUpdateError(null);
			newUpdate && navigate("/");
		}

		getAllBlogs();
	};

	return {
		getAllBlogs,
		deleteBlog,
		createBlog,
		updateBlog,
		isLoading,
		error,
	};
};
