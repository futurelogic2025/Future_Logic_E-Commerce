import gDB from '../config/firebaseConfig.js';

// Reference Firestore
const firestore = gDB.db;

// Create a new transaction
export async function createTransaction(req, res) {
  try {
    const transactionData = req.body;

    // Generate a unique transaction ID (use Firestore document ID)
    const transactionRef = firestore.collection('transactions').doc();
    const transactionId = transactionRef.id;

    // Add transaction_id to the transaction object
    const completeTransactionData = { ...transactionData, transaction_id: transactionId };

    // Store the transaction in Firestore with the transaction ID as the key
    await transactionRef.set(completeTransactionData);

    res.status(201).send({ message: 'Transaction created successfully', transactionId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get a specific transaction by ID
export async function getTransaction(req, res) {
  try {
    const transactionId = req.params.id;
    const transactionDoc = await firestore.collection('transactions').doc(transactionId).get();

    if (!transactionDoc.exists) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    res.status(200).send(transactionDoc.data());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update a transaction's details by ID
export async function updateTransaction(req, res) {
  try {
    const transactionId = req.params.id;
    const updates = req.body;

    // Check if transaction exists
    const transactionRef = firestore.collection('transactions').doc(transactionId);
    const transactionDoc = await transactionRef.get();
    if (!transactionDoc.exists) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    // Update the transaction in Firestore
    await transactionRef.update(updates);

    res.status(200).send({ message: 'Transaction updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Delete a transaction by ID
export async function deleteTransaction(req, res) {
  try {
    const transactionId = req.params.id;

    // Check if transaction exists
    const transactionRef = firestore.collection('transactions').doc(transactionId);
    const transactionDoc = await transactionRef.get();
    if (!transactionDoc.exists) {
      return res.status(404).send({ message: 'Transaction not found' });
    }

    // Delete the transaction in Firestore
    await transactionRef.delete();

    res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get all transactions
export async function getAllTransactions(req, res) {
  try {
    const transactionSnapshot = await firestore.collection('transactions').get();

    if (transactionSnapshot.empty) {
      return res.status(404).send({ message: 'No transactions found' });
    }

    const transactions = [];
    transactionSnapshot.forEach(doc => {
      transactions.push(doc.data());
    });

    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
