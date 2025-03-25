class Product {
  constructor(
    product_id,
    name,
    description,
    price,
    stock_quantity,
    category_id,
    business_id
  ) {
    this.product_id = product_id; // Primary Key: Unique identifier for the product
    this.name = name; // Product name
    this.description = description; // JSON object for product description
    this.price = price; // Current product price
    this.stock_quantity = stock_quantity; // Available stock
    this.category_id = category_id; // Foreign Key: Links to Categories
    this.business_id = business_id; // Foreign Key: Links to the business selling the product
  }

  // Method to update product details
  updateProductDetails(fields) {
    for (const [key, value] of Object.entries(fields)) {
      if (this.hasOwnProperty(key) && key !== 'product_id') {
        this[key] = value; // Update all fields except the primary key
      }
    }
  }

  // Method to adjust stock quantity
  adjustStockQuantity(amount) {
    this.stock_quantity += amount; // Increase or decrease stock
    if (this.stock_quantity < 0) {
      throw new Error("Stock quantity cannot be negative.");
    }
  }
}

export default Product;
