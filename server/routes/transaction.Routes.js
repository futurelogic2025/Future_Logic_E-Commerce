import { Router } from 'express';
import { createTransaction, getTransaction, updateTransaction, deleteTransaction, getAllTransactions } from '../controllers/transactionController';

const router = Router();

// Create a new transaction
router.post('/', createTransaction);

// Read a specific transaction by ID
router.get('/:id', getTransaction);

// Update a transaction's details by ID
router.put('/:id', updateTransaction);

// Delete a transaction by ID
router.delete('/:id', deleteTransaction);

// Get all transactions (optional for vendors or admins)
router.get('/', getAllTransactions);

export default router;
