import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BlogsContextProvider } from './context/BlogContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<BlogsContextProvider>
				<App />
			</BlogsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
