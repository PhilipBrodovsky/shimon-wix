import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { setUser } from '../store/user/actions';

import Api from '../Api';

function Signup() {
	const [form, setForm] = useState({});
	const history = useHistory();
	const dispatch = useDispatch();

	async function onSubmit(event) {
		console.log('form', form);
		event.preventDefault();
		const result = await Api.signup(form);

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

	return (
		<div className='Signup'>
			<div id='id01' className='modal'>
				<span className='close' title='Close Modal'>
					&times;
				</span>
				<form className='modal-content' onSubmit={onSubmit} onChange={onChange}>
					<div className='container'>
						<h1>Sign Up</h1>
						<p>Please fill in this form to create an account.</p>
						<hr />
						<label for='username'>
							<b>username</b>
						</label>
						<input type='password' id='username' placeholder='Enter Password' name='username' />
						<label for='email'>
							<b>Email</b>
						</label>
						<input type='text' placeholder='Enter Email' name='email' />

						<label for='psw'>
							<b>Password</b>
						</label>
						<input type='password' placeholder='Enter Password' name='password' />

						<input type='password' placeholder='Repeat Password' name='psw-repeat' />

						<label>
							<input type='checkbox' checked='checked' name='remember' /> Remember me
						</label>

						<p>
							By creating an account you agree to our <a href='#'>Terms & Privacy</a>.
						</p>

						<div className='clearfix'>
							<button type='button' className='cancelbtn'>
								Cancel
							</button>
							<button type='submit' className='signupbtn'>
								Sign Up
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
