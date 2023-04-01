import express from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { authenticateAccessToken, generateAccessToken } from './auth';
import { isValidInput } from './utils';
import { logger } from './logger';
import bodyParser from 'body-parser';
const app = express();
import { config } from 'dotenv';
config();

// Set up body-parser to enable reading of POST request body
// Note: Use x-www-form-urlencoded body format in Postman
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Set up passport for authentication features
 * Key stored in .env file. Keys can be regenerated via CLI:
 * node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
 * @param strategy - JWT strategy with options object
 * @param callback - Function to call for verification
 */
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.TOKEN_SECRET
}, authenticateAccessToken));

/**
 * Route to create an auth token
 */
app.post('/user', (req, res) => {
	if(!req.body.username) {
		res.status(400).json('Username must be supplied to get an auth token');
	}

	const token = generateAccessToken({ username: req.body.username });
	res.status(200).json(token);
});

/**
 * Basic route to test authenticated response
 * Note: session:false just means each request needs to be authenticated, which makes sense in an API context
 * as opposed to a browser context where a cookie could be stored to keep a user logged in for a period of time
 */
app.get('/', passport.authenticate('jwt', { session: false }),
	function(req, res) {
		res.status(200).json('Hello world');
	}
);

app.get('/add', passport.authenticate('jwt', { session: false }), function (req, res, next) {

	// @ts-ignore
	if (!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /add?n1=x&n2=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);

		if (isValidInput(n1, n2)) {
			const result = n1 + n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch (error) {
		logger.log({
			level: 'error',
			message: 'Error performing addition. Did you enter numbers?',
		});

		res.status(500).json('Error performing addition. Did you enter numbers?');
		next();
	}
});

app.get('/subtract', passport.authenticate('jwt', { session: false }), function (req, res, next) {

	// @ts-ignore
	if (!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /subtract?n1=x&n2=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);
		if (isValidInput(n1, n2)) {
			const result = n1 - n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch (error) {
		logger.log({
			level: 'error',
			message: 'Error performing subtraction. Did you enter numbers?',
		});

		res.status(500).json('Error performing subtraction. Did you enter numbers?');
		next();
	}
});

app.get('/multiply', passport.authenticate('jwt', { session: false }), passport.authenticate('jwt', { session: false }), function (req, res, next) {

	// @ts-ignore
	if (!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /multiply?n1=x&n2=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);
		if (isValidInput(n1, n2)) {
			const result = n1 * n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch (error) {
		logger.log({
			level: 'error',
			message: 'Error performing multiplication. Did you enter numbers?',
		});

		res.status(500).json('Error performing multiplication. Did you enter numbers?');
		next();
	}
});

app.get('/divide', passport.authenticate('jwt', { session: false }), function (req, res, next) {

	// @ts-ignore
	if (!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /divide?n1=x&n2=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);
		if (isValidInput(n1, n2)) {
			const result = n1 / n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch (error) {
		logger.log({
			level: 'error',
			message: 'Error performing division. Did you enter numbers?',
		});

		res.status(500).json('Error performing division. Did you enter numbers?');
		next();
	}
});


app.listen(8080, () => {
	if(process.env.NODE_ENV === 'LOCAL') {
		console.log('Server running on port 8080');
	}
});

