import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { setUser } from '../store/user/actions';

import Api from '../Api';

// with the class name, description, price, duration,
// maximum number of participants
const data = [
	{
		name: 'name',
		description: 'description',
		price: 'price',
		duration: 'duration',
		participantsMax: 'participantsMax',
	},
];

function Home() {
	const [form, setForm] = useState({});
	const history = useHistory();
	const dispatch = useDispatch();



	const onBook = async () => {
		const result = await Api.secret();

		if (result.err) {
			alert(result.err);
			return;
		}
		console.log('result', result);
	}

	return (
		<div className='Home'>
			{data.map((gymClass, i) => {
				return (
					<div key={i} className='card' style={{ width: '400px' }}>
						<img
							class='card-img-top'
							width='300px'
							height='300px'
							src='https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
							alt='Card image'
						/>
						<div class='card-body'>
							<h4 class='card-title'>{gymClass.name}</h4>
							<p class='card-text'>{gymClass.description}</p>
							<p class='card-text'>{gymClass.price}</p>
							<p class='card-text'>{gymClass.duration}</p>
							<p class='card-text'>{gymClass.participantsMax}</p>
							<button href='#' class='btn btn-primary' onClick={onBook}>
								Book
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
