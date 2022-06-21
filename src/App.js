import { Navbar } from './Navbar';
import { Home } from './Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Blog } from './Blog';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/blog/:id' element={<Blog />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}



export default App;
