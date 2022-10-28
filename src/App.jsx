import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import Auth from "./pages/Auth";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { UserBlogs } from "./pages/UserBlogs";
import { Blog } from "./components/Blog";
import { Create } from "./components/Create";
import { Edit } from "./pages/Edit";
import { UserBookmarks } from "./pages/UserBookmarks";
import { UserDrafts } from "./pages/UserDrafts";
import React from "react";
import { AuthorInfo } from "./pages/AuthorInfo";
import { CategoryInfo } from "./pages/CategoryInfo";

function App() {
	const { user } = useAuthContext();
	return (
		<Router>
			<div className="App min-h-screen bg-background px-5 py-5">
				{<Navbar />}
				<div className="content grid grid-cols-1 grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3">
					<Routes>
						<Route
							path="/auth"
							element={!user ? <Auth /> : <Navigate to="/" />}
						/>
						<Route path="/" element={<Home />} />
						<Route path="/blogs/:username" element={<UserBlogs />} />
						<Route
							path="/blogs/:username/bookmarks"
							element={<UserBookmarks />}
						/>
						{/* TODO: reroute to home when routing to blog that's deleted */}
						<Route path="/blog/:id" element={<Blog />} />
						<Route
							path="/blog/create"
							element={user ? <Create /> : <Navigate to="/auth" />}
						/>
						<Route
							path="/blog/edit/:id"
							element={user ? <Edit /> : <Navigate to="/auth" />}
						/>
						<Route
							path="/blogs/:username/drafts"
							element={<UserDrafts />}
						/>
						<Route path="/author/:authorName" element={<AuthorInfo />} />
						<Route
							path="/blogs/category/:categoryName"
							element={<CategoryInfo />}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
