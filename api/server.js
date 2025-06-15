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
	res.json({ message: "Drafters API is running!" });
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
	res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});