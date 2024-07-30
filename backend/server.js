import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// .env
dotenv.config();
console.log("NODE_ENV:", process.env.NODE_ENV);

// internal imports
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productsRouter from "./routes/productsRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import ordersRouter from "./routes/orderRoutes.js";
import usersRouter from "./routes/userRoute.js";
import connectDB from "./config/db.js";

const app = express();
const __dirname = path.resolve();

// Cookie parser middleware
app.use(cookieParser());

// CORS configuration
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging middleware to log requests
app.use((req, res, next) => {
  console.log(`Incoming request to ${req.url}`);
  next();
});

// API routes
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/frontend/uploads")));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  connectDB();
});
