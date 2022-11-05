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
import { UserLikes } from "./pages/UserLikes";
import { useBlogsContext } from "./hooks/useBlogContext";
import { Notification } from "./components/Notification";

function App() {
	const { user } = useAuthContext();
	const { notifyCreate, notifyUpdate, notifyDelete } = useBlogsContext();
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
						<Route
							path="/blogs/:username/likes"
							element={<UserLikes />}
						/>
						{/* TODO: reroute to home when routing to blog that's deleted */}
						<Route path="/blog/:id" element={<Blog />} />
						<Route
							path="/blogs/create"
							element={user ? <Edit /> : <Navigate to="/auth" />}
						/>
						<Route
							path="/blogs/edit/:id"
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
					{notifyCreate ? (
						<Notification
							success={true}
							message={"Blog created successfully!"}
						/>
					) : null}
					{notifyUpdate ? (
						<Notification
							success={true}
							message={"Blog updated successfully!"}
						/>
					) : null}
					{notifyDelete ? (
						<Notification
							error={true}
							message={"Blog deleted successfully!"}
						/>
					) : null}
				</div>
			</div>
		</Router>
	);
}

export default App;
