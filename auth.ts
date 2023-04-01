import jwt from 'jsonwebtoken';

/**
 * Generate an access token for a user
 * @param username
 */
export function generateAccessToken(username) {
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

/**
 * Authenticate an access token passed in the Authorization header of a request
 * Based on https://www.passportjs.org/packages/passport-jwt/
 * except I don't have a "User" type/model so have just done a basic check for an expected value
 *
 * @param payload - data from the passport instance that calls this
 * @param done - passport function to run with the data
 */
export function authenticateAccessToken(payload, done) {
	if(payload.username) {
		return done(null, payload.username); // auth valid
	}

	return done(null, false); //  auth invalid
}

