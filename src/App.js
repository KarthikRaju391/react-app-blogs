import { Navbar } from './Navbar';
import { Home } from './Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Blog } from './Blog';
import { Create } from './Create';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/blog/:id' element={<Blog />} />
						<Route exact path='/blog/create' element={<Create />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}



export default App;
