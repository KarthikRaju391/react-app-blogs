import { useEffect, useState } from 'react';
import { BlogList } from '../components/BlogList';

export const Home = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [blogs, setBlogs] = useState(null);
	const [error, setError] = useState(false);
	useEffect(() => {
		let unsubscribed = false;
		const fetchBlogs = async () => {
			try {
				const response = await fetch(`http://localhost:4000/api/blogs`);
				const data = await response.json();
				if (!unsubscribed) {
					setIsLoading(false);
					setError(false);
					setBlogs(data);
				}
			} catch (error) {
				if (!unsubscribed) {
					setError(true);
					setIsLoading(false);
				}
			}
		};

		fetchBlogs();

		return () => {
			unsubscribed = true;
		};
	}, [setBlogs]);

	return (
		<div className="home">
			{error && <div>'Unable to get the data...</div>}
			{isLoading && <div>Almost there...</div>}
			{blogs && (
				<BlogList
					deleteable={false}
					setBlogs={setBlogs}
					blogs={blogs}
					title="All Blogs"
				/>
			)}
		</div>
	);
};
