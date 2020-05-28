import React from 'react';

function Signup() {
	return (
		<div className='Signup'>
			<div id='id01' className='modal'>
				<span  className='close' title='Close Modal'>
					&times;
				</span>
				<form className='modal-content' action='/action_page.php'>
					<div className='container'>
						<h1>Sign Up</h1>
						<p>Please fill in this form to create an account.</p>
						<hr />
						<label for='email'>
							<b>Email</b>
						</label>
						<input type='text' placeholder='Enter Email' name='email' required />

						<label for='psw'>
							<b>Password</b>
						</label>
						<input type='password' placeholder='Enter Password' name='psw' required />

						<label for='psw-repeat'>
							<b>Repeat Password</b>
						</label>
						<input type='password' placeholder='Repeat Password' name='psw-repeat' required />

						<label>
							<input type='checkbox' checked='checked' name='remember'  /> Remember me
						</label>

						<p>
							By creating an account you agree to our{' '}
							<a href='#'>
								Terms & Privacy
							</a>
							.
						</p>

						<div className='clearfix'>
							<button type='button'  className='cancelbtn'>
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
