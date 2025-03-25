import { Router } from 'express';
import { createReview, getReview, updateReview, deleteReview, getAllReviews } from '../controllers/review.Controller.js';

const router = Router();

// Create a new review
router.post('/', createReview);

// Read a specific review by ID
router.get('/:id', getReview);

// Update a review's details by ID
router.put('/:id', updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

// Get all reviews (optional for admins)
router.get('/', getAllReviews);

export default router;
