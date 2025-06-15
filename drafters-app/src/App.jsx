import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { UserBlogs } from "./pages/UserBlogs";
import { Blog } from "./components/Blog";
import { Edit } from "./pages/Edit";
import { UserBookmarks } from "./pages/UserBookmarks";
import { UserDrafts } from "./pages/UserDrafts";
import React from "react";
import { AuthorInfo } from "./pages/AuthorInfo";
import { CategoryInfo } from "./pages/CategoryInfo";
import { UserLikes } from "./pages/UserLikes";
import { useBlogsContext } from "./hooks/useBlogContext";
import { Notification } from "./components/Notification";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
	const { user } = useAuthContext();
	const {
		notifyCreate,
		notifyUpdate,
		notifyDelete,
		notifyLoading,
		notifyError,
		notificationMessage,
	} = useBlogsContext();
	
	return (
		<ThemeProvider>
			<Router>
				<div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
					<Navbar />
					<main className="container mx-auto px-4 py-8">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<Routes>
								<Route
									path="/auth"
									element={!user ? <Auth /> : <Navigate to="/" />}
								/>
								<Route
									path="/forgot-password"
									element={!user ? <ForgotPassword /> : <Navigate to="/" />}
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
						</div>
					</main>
					
					{/* Notifications */}
					{notifyLoading && (
						<Notification loading={true} message={notificationMessage} />
					)}
					{notifyError && (
						<Notification error={true} message={notificationMessage} />
					)}
					{notifyCreate && (
						<Notification success={true} message={notificationMessage} />
					)}
					{notifyUpdate && (
						<Notification success={true} message={notificationMessage} />
					)}
					{notifyDelete && (
						<Notification error={true} message={notificationMessage} />
					)}
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;