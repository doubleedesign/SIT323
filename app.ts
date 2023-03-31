import express from 'express';
import { isValidInput } from './utils';
import { logger } from './logger';
const app = express();


app.get('/add', (req, res, next) => {

	// @ts-ignore
	if(!req.query.n1 || !req.query.n2) {
		res.status(400).json('Bad request. Correct format is /add?n1=x&n2=y');
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
		res.status(400).json('Bad request. Correct format is /subtract?n1=x&n2=y');
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
		res.status(400).json('Bad request. Correct format is /multiply?n1=x&n2=y');
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
		res.status(400).json('Bad request. Correct format is /divide?n1=x&n2=y');
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


app.listen(8080, () => {
	if(process.env.NODE_ENV === 'LOCAL') {
		console.log('Server running on port 8080');
	}
});

