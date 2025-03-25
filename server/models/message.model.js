class Message {
  constructor(
    message_id,
    transaction_id,
    sender_id,
    receiver_id,
    default_version_id,
    sent_at,
    is_read
  ) {
    this.message_id = message_id; // Primary Key: Unique identifier for the message thread
    this.transaction_id = transaction_id; // Foreign Key: Links to Transactions
    this.sender_id = sender_id; // Foreign Key: Links to Users (sender)
    this.receiver_id = receiver_id; // Foreign Key: Links to Users (receiver)
    this.default_version_id = default_version_id; // Points to the latest message version
    this.sent_at = sent_at; // Date and time the message was originally sent
    this.is_read = is_read; // Boolean: true if the message has been read
  }
}

export default Message;
