import React from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import { Home, Login, Signup } from './pages';

function App() {
	return (
		<div className='App'>
			<div className='main'>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
			</div>
		</div>
	);
}

export default App;
