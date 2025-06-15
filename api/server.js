const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

//routes
const authRoute = require("./Routes/auth");
const blogRoute = require("./Routes/blog");

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Connected to DB!"))
	.catch((err) => {
		console.error(err);
	});

// Add a simple health check route
app.get("/", (req, res) => {
	res.json({ 
		message: "Drafters API is running!",
		timestamp: new Date().toISOString(),
		routes: [
			"GET /",
			"POST /api/auth/signup",
			"POST /api/auth/login", 
			"POST /api/auth/forgot-password",
			"POST /api/auth/verify-otp",
			"POST /api/auth/reset-password",
			"GET /api/blogs",
			"POST /api/blogs"
		]
	});
});

// Debug middleware to log all requests
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next();
});

app.use("/api/blogs", blogRoute);
app.use("/api/auth", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Something went wrong!" });
});

// Handle 404 routes
app.use("*", (req, res) => {
	console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
	res.status(404).json({ 
		error: "Route not found",
		method: req.method,
		path: req.originalUrl,
		availableRoutes: [
			"GET /",
			"POST /api/auth/signup",
			"POST /api/auth/login", 
			"POST /api/auth/forgot-password",
			"POST /api/auth/verify-otp",
			"POST /api/auth/reset-password",
			"GET /api/blogs",
			"POST /api/blogs"
		]
	});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
	console.log(`Available routes:`);
	console.log(`  GET / - Health check`);
	console.log(`  POST /api/auth/signup - User registration`);
	console.log(`  POST /api/auth/login - User login`);
	console.log(`  POST /api/auth/forgot-password - Send OTP for password reset`);
	console.log(`  POST /api/auth/verify-otp - Verify OTP`);
	console.log(`  POST /api/auth/reset-password - Reset password`);
	console.log(`  GET /api/blogs - Get all blogs`);
	console.log(`  POST /api/blogs - Create new blog`);
});