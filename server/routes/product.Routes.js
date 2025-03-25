import { Router } from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/product.Controller';

const router = Router();

// Create a new product
router.post('/', createProduct);

// Read a specific product by ID
router.get('/:id', getProduct);

// Update a product's details by ID
router.put('/:id', updateProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

// Get all products (optional)
router.get('/', getAllProducts);

export default router;
