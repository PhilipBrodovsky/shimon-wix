const jwt = require('jsonwebtoken');

privateKey = 'privateKey';

module.exports.createToken = function createToken(data) {
	return new Promise((resolve, reject) => {
		jwt.sign(data, privateKey, { expiresIn: '10h' }, function (err, token) {
			if (err) return reject(err);
			return resolve(token);
		});
	});
};

module.exports.verifyToken = function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, privateKey, function (err, decoded) {
			if (err) return reject(err);
			return resolve(decoded);
		});
	});
};
