import { createContext, useReducer, useEffect } from "react";

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
	switch (action.type) {
		case "GetBlogs":
			return {
				...state,
				blogs: action.payload,
			};
		case "GetUserBlogs":
			return {
				...state,
				userBlogs: action.payload,
			};
		case "GetAuthorBlogs":
			return {
				...state,
				authorBlogs: action.payload,
			};
		case "GetCategoryBlogs":
			return {
				...state,
				categoryBlogs: action.payload,
			};
		case "GetUserDrafts":
			return {
				...state,
				userDrafts: action.payload,
			};
		case "AddBlog":
			return {
				...state,
				blogs: [action.payload, ...state.blogs],
			};
		case "UpdateBlog":
			return {
				...state,
				blogs: state.blogs.map((blog) => {
					if (blog._id === action.payload.id) {
						blog = { ...action.payload.blog };
						return blog;
					}
					return blog;
				}),
			};
		case "DeleteBlog":
			console.log(action.payload.source);
			if (action.payload.source === "drafts") {
				return {
					...state,
					userDrafts: state.userDrafts.filter(
						(blog) => blog._id !== action.payload.id
					),
				};
			}
			return {
				...state,
				userBlogs: state.userBlogs.filter(
					(blog) => blog._id !== action.payload.id
				),
			};
		case "GetUserBookmarks":
			return {
				...state,
				userBookmarks: action.payload,
			};
		case "GetUserLikes":
			return {
				...state,
				userLikes: action.payload,
			};
		case "NotifyCreateStart":
			return {
				...state,
				notifyCreate: true,
				notificationMessage: action.payload,
			};
		case "NotifyCreateStop":
			return {
				...state,
				notifyCreate: false,
			};
		case "NotifyUpdateStart":
			return {
				...state,
				notifyUpdate: true,
				notificationMessage: action.payload,
			};
		case "NotifyUpdateStop":
			return {
				...state,
				notifyUpdate: false,
			};
		case "NotifyLoadingStart":
			return {
				...state,
				notifyLoading: true,
				notificationMessage: action.payload,
			};
		case "NotifyLoadingStop":
			return {
				...state,
				notifyLoading: false,
			};
		case "NotifyLikeStart":
			return {
				...state,
				notifyUpdate: true,
				notificationMessage: action.payload,
			};
		case "NotifyLikeStop":
			return {
				...state,
				notifyUpdate: false,
				notificationMessage: action.payload,
			};
		case "NotifyDeleteStart":
			return {
				...state,
				notifyDelete: true,
				notificationMessage: action.payload,
			};
		case "NotifyDeleteStop":
			return {
				...state,
				notifyDelete: false,
				notificationMessage: action.payload,
			};
		case "NotifyErrorStart":
			return {
				...state,
				notifyError: true,
				notificationMessage: action.payload,
			};
		case "NotifyErrorStop":
			return {
				...state,
				notifyError: false,
			};
		// SORTING

		case "SortBlogsLatestFirst":
			return {
				blogs: state.blogs.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortBlogsOldestFirst":
			return {
				blogs: state.blogs.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortBlogsMostLikedFirst":
			return {
				...state,
				blogs: state.blogs.sort((a, b) => b.likes.length - a.likes.length),
			};
		case "SortBlogsLeastLikedFirst":
			return {
				...state,
				blogs: state.blogs.sort((a, b) => a.likes.length - b.likes.length),
			};
		case "SortBlogsMostViewedFirst":
			return {
				...state,
				blogs: state.blogs.sort((a, b) => b.views - a.views),
			};
		case "SortBlogsLeastViewedFirst":
			return {
				...state,
				blogs: state.blogs.sort((a, b) => a.views - b.views),
			};

		case "SortUserBlogsLatestFirst":
			return {
				...state,
				userBlogs: state.userBlogs.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortUserBlogsOldestFirst":
			return {
				...state,
				userBlogs: state.userBlogs.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortUserBlogsMostLikedFirst":
			return {
				...state,
				userBlogs: state.userBlogs.sort(
					(a, b) => b.likes.length - a.likes.length
				),
			};
		case "SortUserBlogsLeastLikedFirst":
			return {
				...state,
				userBlogs: state.userBlogs.sort(
					(a, b) => a.likes.length - b.likes.length
				),
			};
		case "SortUserBlogsMostViewedFirst":
			return {
				...state,
				userBlogs: state.userBlogs.sort((a, b) => b.views - a.views),
			};
		case "SortUserBlogsLeastViewedFirst":
			return {
				...state,
				userBlogs: state.userBlogs.sort((a, b) => a.views - b.views),
			};

		case "SortUserBookmarksLatestFirst":
			return {
				...state,
				userBookmarks: state.userBookmarks.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortUserBookmarksOldestFirst":
			return {
				...state,
				userBookmarks: state.userBookmarks.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortUserBookmarksMostLikedFirst":
			return {
				...state,
				userBookmarks: state.userBookmarks.sort(
					(a, b) => b.likes.length - a.likes.length
				),
			};
		case "SortUserBookmarksLeastLikedFirst":
			return {
				...state,
				userBookmarks: state.userBookmarks.sort(
					(a, b) => a.likes.length - b.likes.length
				),
			};
		case "SortUserBookmarksMostViewedFirst":
			return {
				...state,
				userBookmarks: state.userBookmarks.sort(
					(a, b) => b.views - a.views
				),
			};
		case "SortUserBookmarksLeastViewedFirst":
			return {
				...state,
				userBookmarks: state.userBookmakrs.sort(
					(a, b) => a.views - b.views
				),
			};

		case "SortUserDraftsLatestFirst":
			return {
				...state,
				userDrafts: state.userDrafts.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortUserDraftsOldestFirst":
			return {
				...state,
				userDrafts: state.userDrafts.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortUserDraftsMostLikedFirst":
			return {
				...state,
				userDrafts: state.userDrafts.sort(
					(a, b) => b.likes.length - a.likes.length
				),
			};
		case "SortUserDraftsLeastLikedFirst":
			return {
				...state,
				userDrafts: state.userDrafts.sort(
					(a, b) => a.likes.length - b.likes.length
				),
			};
		case "SortUserDraftsMostViewedFirst":
			return {
				...state,
				userDrafts: state.userDrafts.sort((a, b) => b.views - a.views),
			};
		case "SortUserDraftsLeastViewedFirst":
			return {
				...state,
				userDrafts: state.userDrafts.sort((a, b) => a.views - b.views),
			};

		case "SortUserLikesLatestFirst":
			return {
				...state,
				userLikes: state.userLikes.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortUserLikesOldestFirst":
			return {
				...state,
				userLikes: state.userLikes.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortUserLikesMostLikedFirst":
			return {
				...state,
				userLikes: state.userLikes.sort(
					(a, b) => b.likes.length - a.likes.length
				),
			};
		case "SortUserLikesLeastLikedFirst":
			return {
				...state,
				userLikes: state.userLikes.sort(
					(a, b) => a.likes.length - b.likes.length
				),
			};
		case "SortUserLikesMostViewedFirst":
			return {
				...state,
				userLikes: state.userLikes.sort((a, b) => b.views - a.views),
			};
		case "SortUserLikesLeastViewedFirst":
			return {
				...state,
				userLikes: state.userLikes.sort((a, b) => a.views - b.views),
			};

		case "SortAuthorBlogsLatestFirst":
			return {
				...state,
				authorBlogs: state.authorBlogs.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortAuthorBlogsOldestFirst":
			return {
				...state,
				authorBlogs: state.authorBlogs.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortAuthorBlogsMostLikedFirst":
			return {
				...state,
				authorBlogs: state.authorBlogs.sort(
					(a, b) => b.likes.length - a.likes.length
				),
			};
		case "SortAuthorBlogsLeastLikedFirst":
			return {
				...state,
				authorBlogs: state.authorBlogs.sort(
					(a, b) => a.likes.length - b.likes.length
				),
			};
		case "SortAuthorBlogsMostViewedFirst":
			return {
				...state,
				authorBlogs: state.authorBlogs.sort((a, b) => b.views - a.views),
			};
		case "SortAuthorBlogsLeastViewedFirst":
			return {
				...state,
				authorBlogs: state.authorBlogs.sort((a, b) => a.views - b.views),
			};

		case "SortCategoryBlogsLatestFirst":
			return {
				...state,
				categoryBlogs: state.categoryBlogs.sort((a, b) =>
					b.createdAt.localeCompare(a.createdAt)
				),
			};
		case "SortCategoryBlogsOldestFirst":
			return {
				...state,
				categoryBlogs: state.categoryBlogs.sort((a, b) =>
					a.createdAt.localeCompare(b.createdAt)
				),
			};
		case "SortCategoryBlogsMostLikedFirst":
			return {
				...state,
				categoryBlogs: state.categoryBlogs.sort(
					(a, b) => b.likes.length - a.likes.length
				),
			};
		case "SortCategoryBlogsLeastLikedFirst":
			return {
				...state,
				categoryBlogs: state.categoryBlogs.sort(
					(a, b) => a.likes.length - b.likes.length
				),
			};
		case "SortCategoryBlogsMostViewedFirst":
			return {
				...state,
				categoryBlogs: state.categoryBlogs.sort(
					(a, b) => b.views - a.views
				),
			};
		case "SortCategoryBlogsLeastViewedFirst":
			return {
				...state,
				categoryBlogs: state.categoryBlogs.sort(
					(a, b) => a.views - b.views
				),
			};

		default:
			return state;
	}
};

export const BlogsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(blogReducer, {
		blogs: null,
		userBlogs: null,
		userBookmarks: null,
		userDrafts: null,
		userLikes: null,
		authorBlogs: null,
		categoryBlogs: null,
		notifyCreate: false,
		notifyUpdate: false,
		notifyDelete: false,
		notifyLoading: false,
		notifyError: false,
		notificationMessage: null,
	});

	useEffect(() => {
		const blogs = JSON.parse(localStorage.getItem("blogs"));

		if (blogs) {
			dispatch({ type: "GetAllBlogs", payload: blogs });
		}
	}, []);

	console.log("BlogsContext state: ", state);

	return (
		<BlogContext.Provider value={{ ...state, dispatch }}>
			{children}
		</BlogContext.Provider>
	);
};
