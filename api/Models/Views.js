const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema({
	blogId: { type: String },
	userId: { type: String },
});
