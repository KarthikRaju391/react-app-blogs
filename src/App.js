import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import Auth from './pages/Auth';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { UserBlogs } from './components/UserBlogs';
import { Blog } from './components/Blog';
import { Create } from './components/Create';
import { Edit } from './pages/Edit';

function App() {
	const { user } = useAuthContext();
	const [myBlogs, setMyBlogs] = useState(false);
	return (
		<Router>
			<div className="App">
				<Navbar setMyBlogs={setMyBlogs} />
				<div className="content">
					<Routes>
						<Route
							path="/auth"
							element={!user ? <Auth /> : <Navigate to="/" />}
						/>
						<Route path="/" element={<Home myBlogs={myBlogs} />} />
						<Route path="/blogs/:username" element={<UserBlogs />} />
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
