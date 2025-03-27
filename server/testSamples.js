const userSample = {
  user_id: 'u123',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  password: 'hashed_password_123',
  created_at: new Date('2025-03-25'),
  role: 'customer',
  shopping_cart: [],
  transactions: ['t567'],
  addresses: [
    {
      address_id: 'a1',
      house_number: '123',
      apt_number: '10B',
      street: 'Maple Street',
      city: 'Toronto',
      state: 'Ontario',
      postal_code: 'M1X 1A1',
      country: 'Canada',
      isDefault: true,
    },
  ],
  payment_methods: [
    {
      payment_id: 'p1',
      card_number: '**** **** **** 1234',
      expiry_date: new Date('2026-01'),
      payment_type: 'credit_card',
      isDefault: true,
    },
  ],
  privileges: {
    shopping: {
      isGranted: true,
      description: 'Allows the user to make purchases.',
      granted_by: 'admin123',
      granted_at: new Date('2025-03-25'),
    },
  },
  messages: [],
};

const transactionSample = {
  transaction_id: 't567',
  user_id: 'u123',
  vendor_id: 'v456',
  total_amount: 149.99,
  payment_method_id: 'p1',
  transaction_date: new Date('2025-03-26'),
  shipping_address_id: 'a1',
  billing_address_id: 'a1',
  products: [
    {
      product_id: 'prod101',
      unit_price: 49.99,
      quantity: 3,
    },
  ],
  tracking_status: [
    {
      tracking_id: 'track1',
      status: 'purchased',
      status_date: new Date('2025-03-26'),
      latitude: 43.6532,
      longitude: -79.3832,
    },
  ],
  messages: ['m001'],
};

const messageSample = {
  message_id: 'm001',
  transaction_id: 't567',
  sender_id: 'u123',
  receiver_id: 'v456',
  content: {
    latest: 'Hi! Can you confirm if the order has been shipped?',
    archive: ['Order placed successfully. Thank you!'],
  },
  sent_at: new Date('2025-03-26T10:00:00Z'),
  is_read: false,
};

const reviewSample = {
  review_id: 'r789',
  user_id: 'u123',
  vendor_id: 'v456',
  product_id: 'prod101',
  rating: 5,
  comment: {
    latest: 'Amazing product! Great quality.',
    archive: ['Really liked the product.'],
  },
  review_date: new Date('2025-03-27'),
};

const productSample = {
  product_id: 'prod101',
  name: 'Wireless Headphones',
  description: {
    short: 'High-quality wireless headphones.',
    long: 'Experience the ultimate sound quality with noise-canceling technology and long-lasting battery.',
    specs: { weight: '250g', color: 'Black', dimensions: '15cm x 10cm x 7cm' },
    features: ['Bluetooth 5.0', 'Active Noise Cancellation', 'Up to 20 hours of playback'],
  },
  price: 49.99,
  stock_quantity: 150,
  category_id: 'Electronics',
  business_id: 'b123',
};
