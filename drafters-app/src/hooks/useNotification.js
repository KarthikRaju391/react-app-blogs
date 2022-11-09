import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useBlogsContext } from "./useBlogContext";
import { useUserBookmarks } from "./useUserBookmarks";

export const useNotification = () => {
	const { dispatch } = useBlogsContext();
	const { getUserBookmarks } = useUserBookmarks();
	const location = useLocation();
	const path = location.pathname;

	const notifyLoadingState = (
		createState,
		draftState,
		updateState,
		deleteState
	) => {
		createState &&
			dispatch({ type: "NotifyLoadingStart", payload: "Publishing..." });
		draftState &&
			dispatch({ type: "NotifyLoadingStart", payload: "Saving..." });
		updateState &&
			dispatch({ type: "NotifyLoadingStart", payload: "Updating..." });
		deleteState &&
			dispatch({ type: "NotifyLoadingStart", payload: "Deleting..." });
	};

	const notifyError = (createError, updateError, deleteError) => {
		dispatch({ type: "NotifyLoadingStop" });
		createError &&
			dispatch({
				type: "NotifyErrorStart",
				payload: "Couldn't create blog",
			});
		updateError &&
			dispatch({
				type: "NotifyErrorStart",
				payload: "Couldn't update blog",
			});
		deleteError &&
			dispatch({
				type: "NotifyErrorStart",
				payload: "Couldn't delete blog",
			});
		setTimeout(() => {
			dispatch({ type: "NotifyErrorStop" });
		}, 1500);
	};

	const notifyDeleteBlog = () => {
		dispatch({ type: "NotifyLoadingStop" });
		dispatch({
			type: "NotifyDeleteStart",
			payload: "Blog deleted successfully!",
		});
		setTimeout(() => {
			dispatch({ type: "NotifyDeleteStop" });
		}, 1500);
	};

	const notifyCreateBlog = (createDraft) => {
		dispatch({ type: "NotifyLoadingStop" });
		createDraft
			? dispatch({
					type: "NotifyCreateStart",
					payload: "Draft created successfully!",
			  })
			: dispatch({
					type: "NotifyCreateStart",
					payload: "Blog published successfully!",
			  });
		setTimeout(() => {
			dispatch({ type: "NotifyCreateStop" });
		}, 1500);
	};

	const notifyLikeUpdate = (addLike) => {
		dispatch({ type: "NotifyLoadingStop" });
		if (addLike === true) {
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
		}, 1500);
	};

	const notifyUpdateBlog = (bookmarkAddUpdate) => {
		dispatch({ type: "NotifyLoadingStop" });
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
			path.split("/")[3] === "bookmarks" && getUserBookmarks();
		}
		setTimeout(() => {
			dispatch({ type: "NotifyUpdateStop" });
		}, 1500);
	};

	return {
		notifyLoadingState,
		notifyCreateBlog,
		notifyLikeUpdate,
		notifyUpdateBlog,
		notifyDeleteBlog,
		notifyError,
	};
};
