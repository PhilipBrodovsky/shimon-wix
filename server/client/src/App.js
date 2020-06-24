import React, { useEffect } from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import { Home, Login, Signup } from './pages';

import { setUser } from './store/user/actions';
import { useDispatch, useSelector } from 'react-redux';

import Api from './Api';

function App() {
	const dispatch = useDispatch();

	const user = useSelector(state => state.user);

	useEffect(() => {
		async function getUser() {
			const user = await Api.getUser();
			console.log('user', user);
			dispatch(setUser(user));
		}
		getUser();
	}, []);

	if (!user) {
		return (
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		);
	}

	// const img = user.photos[0].value;

	return (
		<div className="App">
			<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#">
							{/* {user.displayName} */}
							{/* <img src={img} alt="profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> */}
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							Link 2
						</a>
					</li>
				</ul>
				<span class="navbar-text">Navbar text</span>
			</nav>
			<div className="main">
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
			</div>
		</div>
	);
}

export default App;
