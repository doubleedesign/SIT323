import express from 'express';
import winston from 'winston';
const app = express();

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	defaultMeta: { service: 'calculator-microservice' },
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/combined.log' }),
	],
});

function isValidInput(n1, n2) {
	if(!isNaN(n1) || !isNaN(n2)) {
		logger.log({
			level: 'error',
			message: `Invalid input. You entered ${n1} and ${n1}. Are these both numbers?`,
		});

		return false;
	}

	return true;
}

app.get('/add', (req, res, next) => {

	// @ts-ignore
	if(!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /add?n1=x&n1=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);

		if(isValidInput(n1, n2)) {
			const result = n1 + n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch(error) {
		logger.log({
			level: 'error',
			message: 'Error performing addition. Did you enter numbers?',
		});

		res.status(500).json('Error performing addition. Did you enter numbers?');
		next();
	}
});

app.get('/subtract', (req, res, next) => {

	// @ts-ignore
	if(!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /subtract?n1=x&n1=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);
		if(isValidInput(n1, n2)) {
			const result = n1 - n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch(error) {
		logger.log({
			level: 'error',
			message: 'Error performing subtraction. Did you enter numbers?',
		});

		res.status(500).json('Error performing subtraction. Did you enter numbers?');
		next();
	}
});

app.get('/multiply', (req, res, next) => {

	// @ts-ignore
	if(!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /multiply?n1=x&n1=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);
		if(isValidInput(n1, n2)) {
			const result = n1 * n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch(error) {
		logger.log({
			level: 'error',
			message: 'Error performing multiplication. Did you enter numbers?',
		});

		res.status(500).json('Error performing multiplication. Did you enter numbers?');
		next();
	}
});

app.get('/divide', (req, res, next) => {

	// @ts-ignore
	if(!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /divide?n1=x&n1=y');
		next();
	}

	try {
		// @ts-ignore
		const n1 = parseInt(req.query.n1);
		// @ts-ignore
		const n2 = parseInt(req.query.n2);
		if(isValidInput(n1, n2)) {
			const result = n1 / n2;
			res.status(200).json(result);
		}

		res.status(400).json('Invalid input');
	}
	catch(error) {
		logger.log({
			level: 'error',
			message: 'Error performing division. Did you enter numbers?',
		});

		res.status(500).json('Error performing division. Did you enter numbers?');
		next();
	}
});

if(process.env.NODE_ENV == 'local') {
	app.listen(8080, () => {
		console.log('Server running on port 8080');
	});
}
