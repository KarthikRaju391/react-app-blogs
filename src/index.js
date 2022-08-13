import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BlogsContextProvider } from './context/BlogsContext';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<BlogsContextProvider>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</BlogsContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
