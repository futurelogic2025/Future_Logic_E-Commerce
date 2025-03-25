import { Router } from 'express';
import { createMessage, getMessage, updateMessage, deleteMessage, getAllMessages } from '../controllers/message.Controller';

const router = Router();

// Create a new message
router.post('/', createMessage);

// Read a specific message by ID
router.get('/:id', getMessage);

// Update a message's details by ID
router.put('/:id', updateMessage);

// Delete a message by ID
router.delete('/:id', deleteMessage);

// Get all messages (optional)
router.get('/', getAllMessages);

export default router;
