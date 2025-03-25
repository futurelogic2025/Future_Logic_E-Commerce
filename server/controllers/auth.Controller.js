import { verify, sign } from 'jsonwebtoken';
import { randomBytes, pbkdf2Sync } from 'crypto';

// Secret key for signing JWT tokens (store securely in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const SALT_LENGTH = 16; // Salt length
const HASH_ITERATIONS = 10000; // Number of iterations
const HASH_LENGTH = 64; // Key length
const HASH_ALGORITHM = 'sha512'; // Hashing algorithm

// Middleware to verify JWT token
export function verifyJwtToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Unauthorized. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the JWT token
    const decodedToken = verify(token, JWT_SECRET); // Verify the token

    req.user = decodedToken; // Attach decoded payload to the request object
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized. Invalid or expired token.', error: error.message });
  }
}

// Generate JWT token
export function generateJwtToken(user) {
  const payload = {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
  };

  return sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Hash a password using crypto
export function hashPassword(password) {
  const salt = randomBytes(SALT_LENGTH).toString('hex'); // Generate a random salt
  const hash = pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_LENGTH, HASH_ALGORITHM).toString('hex'); // Hash the password
  return `${salt}:${hash}`; // Return the combined salt and hash
}

// Verify a password
export function verifyPassword(password, storedPassword) {
  const [salt, originalHash] = storedPassword.split(':'); // Split the stored password into salt and hash
  const hash = pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_LENGTH, HASH_ALGORITHM).toString('hex'); // Hash the provided password with the original salt
  return hash === originalHash; // Check if the hashes match
}
