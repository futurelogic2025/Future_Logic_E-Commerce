import Stack from "./stack.model.js";

class Transaction {
  constructor(
    transaction_id,
    user_id,
    vendor_id,
    total_amount,
    payment_method_id,
    transaction_date,
    shipping_address_id,
    billing_address_id,
    products,
    tracking_status,
    messages
  ) {
    this.transaction_id = transaction_id; // Primary Key: Unique identifier
    this.user_id = user_id; // Foreign Key: Links to Users (buyer)
    this.vendor_id = vendor_id; // Foreign Key: Links to Users (vendor)
    this.total_amount = total_amount; // Total amount paid
    this.payment_method_id = payment_method_id; // References the payment method used
    this.transaction_date = transaction_date; // Date and time of purchase
    this.shipping_address_id = shipping_address_id; // References the shipping address
    this.billing_address_id = billing_address_id || shipping_address_id; // Defaults to shipping address if not provided
    this.products = products || []; // Array of shopping cart items
    this.tracking_status = tracking_status || new Stack(); // Stack of tracking status objects
    this.messages = messages || []; // Array of message objects associated with the transaction
  }

  // Method to add a product
  addProduct(product) {
    this.products.push(product);
    this.updateTotalAmount(); // Update the total amount
  }

  // Method to remove any product by ID
  removeProductById(product_id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(
      (product) => product.product_id !== product_id
    );

    if (initialLength === this.products.length) {
      throw new Error(`Product with ID: ${product_id} not found.`);
    }

    this.updateTotalAmount(); // Update the total amount
  }

  // Method to add a tracking status
  addTrackingStatus(trackingObject) {
    this.tracking_status.push(trackingObject);
  }

  // Method to remove the last-added tracking status
  removeLastTrackingStatus() {
    if (this.tracking_status.size() > 0) {
      this.tracking_status.pop();
    } else {
      throw new Error("No tracking statuses to remove.");
    }
  }

  // Method to add a message to the messages array
  addMessage(message) {
    this.messages.push(message);
  }

  // Method to update the total amount
  updateTotalAmount() {
    this.total_amount = this.products.reduce((total, product) => {
      return total + product.unit_price * product.quantity;
    }, 0);
  }
}

export default Transaction;
