import { Navbar } from './Navbar';
import { Home } from './Home';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Blog } from './Blog';
import { Create } from './Create';
import Auth from './Auth';

function App() {
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<Router>
			<div className="App">
				{user && <Navbar />}
				<div className="content">
					<Routes>
						<Route
							path="/auth"
							// element={!user ? <Auth /> : <Navigate to="/" />}
							element={<Auth />}
						/>
						<Route
							path="/"
							element={!user ? <Navigate to="/auth" /> : <Home />}
						/>
						<Route path="/blog/:id" element={<Blog />} />
						<Route path="/blog/create" element={<Create />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
