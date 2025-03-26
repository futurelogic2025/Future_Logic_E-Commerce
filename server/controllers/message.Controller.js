import gDB from '../config/firebaseConfig.js';

// Reference Firestore
const firestore = gDB.db;

// Create a new message
export async function createMessage(req, res) {
  try {
    const messageData = req.body;

    // Generate a unique message ID (Firestore document ID)
    const messageRef = firestore.collection('messages').doc();
    const messageId = messageRef.id;

    // Add message_id to the message object
    const completeMessageData = { ...messageData, message_id: messageId };

    // Save the message in Firestore
    await messageRef.set(completeMessageData);

    res.status(201).send({ message: 'Message created successfully', messageId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get a specific message by ID
export async function getMessage(req, res) {
  try {
    const messageId = req.params.id;
    const messageDoc = await firestore.collection('messages').doc(messageId).get();

    if (!messageDoc.exists) {
      return res.status(404).send({ message: 'Message not found' });
    }

    res.status(200).send(messageDoc.data());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update a message's details by ID
export async function updateMessage(req, res) {
  try {
    const messageId = req.params.id;
    const updates = req.body;

    // Check if message exists
    const messageRef = firestore.collection('messages').doc(messageId);
    const messageDoc = await messageRef.get();
    if (!messageDoc.exists) {
      return res.status(404).send({ message: 'Message not found' });
    }

    // Update the message in Firestore
    await messageRef.update(updates);

    res.status(200).send({ message: 'Message updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Delete a message by ID
export async function deleteMessage(req, res) {
  try {
    const messageId = req.params.id;

    // Check if message exists
    const messageRef = firestore.collection('messages').doc(messageId);
    const messageDoc = await messageRef.get();
    if (!messageDoc.exists) {
      return res.status(404).send({ message: 'Message not found' });
    }

    // Delete the message in Firestore
    await messageRef.delete();

    res.status(200).send({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get all messages
export async function getAllMessages(req, res) {
  try {
    const messageSnapshot = await firestore.collection('messages').get();

    if (messageSnapshot.empty) {
      return res.status(404).send({ message: 'No messages found' });
    }

    const messages = [];
    messageSnapshot.forEach(doc => {
      messages.push(doc.data());
    });

    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
