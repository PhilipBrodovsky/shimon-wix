const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

let connection = null;

const options = { useUnifiedTopology: true };

function getConnection() {
	return new Promise((resolve, reject) => {
		if (connection) {
			return resolve(connection);
		}
		// Use connect method to connect to the server
		MongoClient.connect(url, options, function (err, client) {
			if (err) {
				return reject(err);
			}
			connection = client;
			return resolve(connection);
		});
	});
}

module.exports = { getConnection };
