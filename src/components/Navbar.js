import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();

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
									<p onClick={handleLogout}>Logout</p>
								</div>
							)}
						</button>
					)}
				</div>
			</nav>
		</div>
	);
};
