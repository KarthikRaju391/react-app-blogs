import { createContext, useReducer, useEffect } from 'react';

export const BlogContext = createContext();

export const blogReducer = (state, action) => {
	switch (action.type) {
		case 'GetBlogs':
			return {
				blogs: action.payload,
			};
		case 'AddBlog':
			return {
				blogs: [action.payload, ...state.blogs],
			};
		case 'UpdateBlog':
			return {
				blogs: state.blogs.map((blog) => {
					if (blog._id === action.payload.id) {
						blog = { ...action.payload.blog };
						return blog;
					}
					return blog;
				}),
			};
		case 'DeleteBlog':
			return {
				blogs: state.blogs.filter((blog) => blog._id !== action.payload.id),
			};
		default:
			return state;
	}
};

export const BlogsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(blogReducer, {
		blogs: null,
	});

	console.log('Blogs context: ', state);

	return (
		<BlogContext.Provider value={{ ...state, dispatch }}>
			{children}
		</BlogContext.Provider>
	);
};
