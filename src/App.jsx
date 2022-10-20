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
import AuthorList from "./components/AuthorList";

function App() {
	const { user } = useAuthContext();
	return (
		<Router>
			<div className="App min-h-screen bg-background px-5 py-5">
				{<Navbar />}
				<div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
