import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch from '../hooks/useFetch';

export const Navbar = () => {
	const navigate = useNavigate();
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleChange = () => {};
	const handleLogout = () => {
		logout();
	};

	return (
		<div>
			<nav className="navbar">
				<h1>Drafters</h1>
				<div className="links">
					<Link to="/">Home</Link>
					<Link to="/blog/create">New Blog</Link>
					{!user ? (
						<Link to="/auth">Login</Link>
					) : (
						<button className="account-hover" to="">
							{!user ? 'Login' : `Hi, ${user.username}`}
							{user && (
								<div className="dropdown_content">
									<Link to={`/blogs/${user.username}`}>
										Your Blogs
									</Link>
									<a onClick={handleLogout}>Logout</a>
								</div>
							)}
						</button>
					)}
				</div>
			</nav>
		</div>
	);
};
