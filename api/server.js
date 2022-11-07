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

app.use("/api/blogs", blogRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 4000, () => {
	console.log("Server is running!");
});
