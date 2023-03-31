import { logger } from './logger';

export function isValidInput(n1, n2) {
	if(isNaN(n1) || isNaN(n2)) {
		logger.log({
			level: 'error',
			message: `Invalid input. You entered ${n1} and ${n1}. Are these both numbers?`,
		});

		return false;
	}

	return true;
}
