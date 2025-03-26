// db.js
import mongoose from 'mongoose';
import config from './config/config.js';

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connected!'))
.catch(err => console.error('Database connection error:', err));
