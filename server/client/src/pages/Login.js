import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { setUser } from '../store/user/actions';

import Api from '../Api';

function Login() {
	const [form, setForm] = useState({});
	const history = useHistory();
	const dispatch = useDispatch();

	async function onSubmit(event) {
		console.log('form', form);
		event.preventDefault();
		const result = await Api.login(form);

		if (result.err) {
			alert(result.err);
			return;
		}
		dispatch(setUser(result.data.user));
		localStorage.setItem('token', result.data.token);
		history.push('/');
	}

	function onChange(event) {
		console.log(event.target);
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	}

	console.log('login');

	return (
		<div className="Login">
			<span className="close" title="Close Modal">
				&times;
			</span>
			<form className="modal-content" onSubmit={onSubmit} onChange={onChange}>
				<div className="container">
					<h1>Login</h1>
					<p>Please fill in this form to login.</p>
					<hr />
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input type="text" id="email" placeholder="Enter Email" name="email" />

					<label htmlFor="password">
						<b>Password</b>
					</label>
					<input type="password" id="password" placeholder="Enter Password" name="password" />

					<div className="clearfix">
						<a href="/auth/google" className="cancelbtn">
							Sign up via Google
						</a>
						<a href="/auth/facebook" className="cancelbtn">
							Sign up via Facebook
						</a>
						<button type="submit" className="signupbtn">
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
