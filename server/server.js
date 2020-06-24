const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const { getConnection } = require('./database');
const app = express();

app.use(express.json());
app.use(cors());

const utils = require('./utils');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const GOOGLE_CLIENT_ID = '366651540751-7sobndha3c3dlj3bjnem91m206m2h04c.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'eRBjahIuHRUcAzd-FDQ6yzdN';

app.use(
	cookieSession({
		secret: 'secret',
	})
);
app.use(passport.initialize());
app.use(passport.session());

// after verifyGoogleCallback
passport.serializeUser((user, done) => {
	console.log('serializeUser', user.email);
	done(null, user);
});

passport.deserializeUser(async (email, done) => {
	try {
		// console.log('deserializeUser', email);
		const client = await getConnection();
		const coll = client.db('ShimonWix').collection('Users');
		const user = await coll.findOne({
			email: email,
		});
		done(null, user);
	} catch (err) {
		console.log('deserializeUser err', err.message);
		done(err, null);
	}
});

async function verifyGoogleCallback(accessToken, refreshToken, profile, done) {
	try {
		const { email } = profile._json;
		// after login at google
		const client = await getConnection();
		const coll = client.db('ShimonWix').collection('Users');
		const user = await coll.findOne({
			email: email,
		});

		if (user) {
			// if user allready exists return user
			return done(null, user);
		} else {
			// if user not exists create one
			const insertRes = await coll.insertOne({ ...profile, email });
			const newUser = insertRes.ops[0];
			return done(null, newUser);
		}
	} catch (err) {
		console.log('verifyGoogleCallback err:', err.message);
		return done(err, null);
	}
}
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
		},
		verifyGoogleCallback
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: '956719318106662',
			clientSecret: '5ae1856c9fe7f8671710a79b1a9ca9a9',
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'displayName', 'photos', 'email'],
			enableProof: true,
		},
		verifyGoogleCallback
	)
);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
});

// redirect to google login page
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//after login in google login page Successful authentication, redirect home.
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
	res.redirect('/');
});

app.get('/api/secret', async (req, res) => {
	try {
		res.json(req.user);
	} catch (err) {
		res.status(500).json({
			err: err.message,
		});
	}
});

app.get('/getUser', async (req, res) => {
	try {
		res.json(req.user);
	} catch (err) {
		res.status(500).json({
			err: err.message,
		});
	}
});

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const client = await getConnection();
		const coll = client.db('main').collection('users');

		const user = await coll.findOne({
			email: email,
		});

		if (!user || password != user.password) {
			return res.json({
				err: 'email or password not valid',
				data: null,
			});
		}

		const token = await utils.createToken(user);
		res.json({
			err: null,
			data: { user: user, token: token },
		});
	} catch (err) {
		console.log(`login err: ${err.message}`);
		res.status(500).json({
			err: err.message,
			data: null,
		});
	}
});

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

		const result = await coll.insertOne({ username, email, password, isAdmin: false });
		const newUser = result.ops[0];

		const token = await utils.createToken(newUser);

		res.json({
			err: null,
			data: { user: newUser, token: token },
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
