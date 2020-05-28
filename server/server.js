const express = require('express');
const cors = require('cors');

const { getConnection } = require('./database');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const client = await getConnection();

		const coll = client.db('main').collection('users');

		const user = await coll.findOne({
			email: email,
		});

		if (user) {
			return res.status(500).json({
				err: 'user with this email exits',
				data: null,
			});
		}

		const result = await coll.insertOne({ username, email, password });

		console.log('result', result.ops);

		res.json({
			err: null,
			data: 'ok',
		});
	} catch (err) {
		console.log(`signup err: ${err.message}`);
		res.status(500).json({
			err: err.message,
			data: null,
		});
	}
});

const PORT = process.env.PORT || 4000;

getConnection().then(() => {
	app.listen(PORT, () => {
		console.log('server run on PORT:', PORT);
	});
});
