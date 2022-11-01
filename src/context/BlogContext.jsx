import { createContext, useReducer, useEffect } from "react";

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
	switch (action.type) {
		case "GetBlogs":
			return {
				blogs: action.payload,
			};
		case "GetUserBlogs":
			return {
				blogs: action.payload,
			};
		case "GetUserDrafts":
			return {
				blogs: action.payload,
			};
		case "AddBlog":
			return {
				blogs: [action.payload, ...state.blogs],
			};
		case "UpdateBlog":
			return {
				blogs: state.blogs.map((blog) => {
					if (blog._id === action.payload.id) {
						blog = { ...action.payload.blog };
						return blog;
					}
					return blog;
				}),
			};
		case "DeleteBlog":
			return {
				blogs: state.blogs.filter((blog) => blog._id !== action.payload.id),
			};
		case "GetUserBookmarks":
			return {
				blogs: action.payload,
			};
		case "GetUserLikes":
			return {
				blogs: action.payload,
			};
		case "SortBlogsLatestFirst":
			return {
				blogs: state.blogs.sort((a, b) =>
					b.updatedAt.localeCompare(a.updatedAt)
				),
			};
		case "SortBlogsOldestFirst":
			return {
				blogs: state.blogs.sort((a, b) =>
					a.updatedAt.localeCompare(b.updatedAt)
				),
			};
		case "SortBlogsMostLikedFirst":
			return {
				blogs: state.blogs.sort((a, b) => b.likes.length - a.likes.length),
			};
		case "SortBlogsLeastLikedFirst":
			return {
				blogs: state.blogs.sort((a, b) => a.likes.length - b.likes.length),
			};
		default:
			return state;
	}
};

export const BlogsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(blogReducer, {
		blogs: null,
		//TODO: Notification system!
	});

	return (
		<BlogContext.Provider value={{ ...state, dispatch }}>
			{children}
		</BlogContext.Provider>
	);
};
