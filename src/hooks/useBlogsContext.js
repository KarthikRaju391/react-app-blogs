import { BlogsContext } from '../context/BlogsContext';
import { useContext } from 'react';

export const useBlogsContext = () => {
	const context = useContext(BlogsContext);

	if (!context) {
		throw Error('Blogs context not available');
	}

	return context;
};
