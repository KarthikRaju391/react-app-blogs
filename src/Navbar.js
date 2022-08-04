import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));

	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/auth');
	};

	return (
		<div>
			<nav className="navbar">
				<h1>The Dojo Blog</h1>
				<div className="links">
					<Link to="/">Home</Link>
					<Link to="/blog/create">New Blog</Link>
					<Link className="account-hover" to="">
						Account
						<div className="dropdown_content">
							<p>Hi, {`${user.firstname} ${user.lastname}`}</p>
							<button>Your Blogs</button>
							<button onClick={handleLogout}>Logout</button>
						</div>
					</Link>
				</div>
			</nav>
		</div>
	);
};
