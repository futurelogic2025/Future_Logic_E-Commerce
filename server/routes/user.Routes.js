import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/user.Controller.js';

const router = Router();

// CRUD endpoints

// Create a new user
router.post('/', createUser);

// Read a specific user by ID
router.get('/:id', getUser);

// Update a user's details by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

// Get all users (optional for admin features)
router.get('/', getAllUsers);


export default router;

