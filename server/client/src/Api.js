function Api(url) {
	this.url = url;
	this.headers = {
		'Content-Type': 'application/json',
	};

	this.getUser = async function () {
		try {
			const options = {
				headers: this.headers,
				method: 'GET',
			};
			const res = await fetch(`/getUser`, options);
			const data = await res.json();
			if (data.err) {
				throw new Error(data.err);
			}
			return data;
		} catch (err) {
			return {
				err: err.message,
			};
		}
	};

	this.signup = async function (body) {
		try {
			const options = {
				headers: this.headers,
				method: 'POST',
				body: JSON.stringify(body),
			};
			const res = await fetch(`${this.url}/signup`, options);
			const data = await res.json();
			return data;
		} catch (err) {
			return {
				err: err.message,
			};
		}
	};
	this.login = async function (body) {
		try {
			const options = {
				headers: this.headers,
				method: 'POST',
				body: JSON.stringify(body),
			};
			const res = await fetch(`${this.url}/login`, options);
			const data = await res.json();
			return data;
		} catch (err) {
			return {
				err: err.message,
			};
		}
	};
	this.secret = async function () {
		try {
			const options = {
				headers: this.headers,
				method: 'GET',
			};
			const token = localStorage.getItem('token');
			options.headers.token = token;
			const res = await fetch(`/api/secret`, options);
			const data = await res.json();
			return data;
		} catch (err) {
			return {
				err: err.message,
			};
		}
	};
}

export default new Api('http://localhost:4000');
