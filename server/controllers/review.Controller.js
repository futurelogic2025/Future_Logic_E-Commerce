import { firestore as _firestore } from '../config/firebaseConfig.js';

// Reference Firestore
const firestore = _firestore();

// Create a new review
export async function createReview(req, res) {
  try {
    const reviewData = req.body;

    // Generate a unique review ID (Firestore document ID)
    const reviewRef = firestore.collection('reviews').doc();
    const reviewId = reviewRef.id;

    // Add review_id to the review object
    const completeReviewData = { ...reviewData, review_id: reviewId };

    // Save the review in Firestore
    await reviewRef.set(completeReviewData);

    res.status(201).send({ message: 'Review created successfully', reviewId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get a specific review by ID
export async function getReview(req, res) {
  try {
    const reviewId = req.params.id;
    const reviewDoc = await firestore.collection('reviews').doc(reviewId).get();

    if (!reviewDoc.exists) {
      return res.status(404).send({ message: 'Review not found' });
    }

    res.status(200).send(reviewDoc.data());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update a review's details by ID
export async function updateReview(req, res) {
  try {
    const reviewId = req.params.id;
    const updates = req.body;

    // Check if review exists
    const reviewRef = firestore.collection('reviews').doc(reviewId);
    const reviewDoc = await reviewRef.get();
    if (!reviewDoc.exists) {
      return res.status(404).send({ message: 'Review not found' });
    }

    // Update the review in Firestore
    await reviewRef.update(updates);

    res.status(200).send({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Delete a review by ID
export async function deleteReview(req, res) {
  try {
    const reviewId = req.params.id;

    // Check if review exists
    const reviewRef = firestore.collection('reviews').doc(reviewId);
    const reviewDoc = await reviewRef.get();
    if (!reviewDoc.exists) {
      return res.status(404).send({ message: 'Review not found' });
    }

    // Delete the review in Firestore
    await reviewRef.delete();

    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get all reviews
export async function getAllReviews(req, res) {
  try {
    const reviewSnapshot = await firestore.collection('reviews').get();

    if (reviewSnapshot.empty) {
      return res.status(404).send({ message: 'No reviews found' });
    }

    const reviews = [];
    reviewSnapshot.forEach(doc => {
      reviews.push(doc.data());
    });

    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
