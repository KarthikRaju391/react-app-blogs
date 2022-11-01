const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		title: { type: String, required: true },
		body: { type: String, required: true },
		likes: { type: Array, required: true },
		author: { type: String, required: true },
		category: { type: String },
		bookmark: { type: Array },
		views: { type: Number },
		draft: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Blog", BlogSchema);
