import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import Auth from './pages/Auth';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Blog } from './components/Blog';
import { Create } from './components/Create';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes>
						<Route path="/auth" element={<Auth />} />
						<Route path="/" element={<Home />} />
						<Route path="/blog/:id" element={<Blog />} />
						<Route path="/blog/create" element={<Create />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
