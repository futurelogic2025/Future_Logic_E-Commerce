import gDB from '../config/firebaseConfig.js';

// Reference Firestore
const firestore = gDB.db;

// Create a new product
export async function createProduct(req, res) {
  try {
    const productData = req.body;

    // Generate a unique product ID (Firestore document ID)
    const productRef = firestore.collection('products').doc();
    const productId = productRef.id;

    // Add product_id to the product object
    const completeProductData = { ...productData, product_id: productId };

    // Save the product in Firestore
    await productRef.set(completeProductData);

    res.status(201).send({ message: 'Product created successfully', productId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get a specific product by ID
export async function getProduct(req, res) {
  try {
    const productId = req.params.id;
    const productDoc = await firestore.collection('products').doc(productId).get();

    if (!productDoc.exists) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(productDoc.data());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update a product's details by ID
export async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const updates = req.body;

    // Check if product exists
    const productRef = firestore.collection('products').doc(productId);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Update the product in Firestore
    await productRef.update(updates);

    res.status(200).send({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Delete a product by ID
export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    // Check if product exists
    const productRef = firestore.collection('products').doc(productId);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Delete the product in Firestore
    await productRef.delete();

    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get all products
export async function getAllProducts(req, res) {
  try {
    const productSnapshot = await firestore.collection('products').get();

    if (productSnapshot.empty) {
      return res.status(404).send({ message: 'No products found' });
    }

    const products = [];
    productSnapshot.forEach(doc => {
      products.push(doc.data());
    });

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


// -----------------------------------------------------------------------------------------------------------
/*

*/