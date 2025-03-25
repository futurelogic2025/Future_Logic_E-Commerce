import { static as static_ } from 'express'
import config from "./config/config.js";
import app from "./server/express.js";
import { join } from "path";
import __dirname from "./server/_dirname.js";
import template from './template/template.js';

// Import routes
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import messageRoutes from './routes/messageRoutes';
import reviewRoutes from './routes/reviewRoutes';
import productRoutes from './routes/productRoutes';

//mongoose
// import mongoose from "mongoose";
// mongoose.Promise = global.Promise;
// mongoose.connect(config.mongoUri)
//   .then(() => console.log("Connected to MongoDB successfully!"))
//   .catch((err) => console.error("Connection error", err));
// mongoose.connection.on("error", (e) => {
//   console.log(e)
//   throw new Error(`unable to connect to database: ${ config.mongoUri }`);
// });

// app.get("/*", (_req, res) => {
//   res.sendFile(join(__dirname, "../public", "index.html"));
// });

// app.get("/", (_req, res) => {
//   res.status(200).send(template());
// });

// app.use("/", static_(join(__dirname, "public")));



app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.redirect('/');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/messages', messageRoutes);
app.use('/reviews', reviewRoutes);
app.use('/products', productRoutes);

// ----app listening------
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});


