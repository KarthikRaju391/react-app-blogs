const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		title: { type: String, required: true },
		body: { type: String, required: true },
		likes: { type: Array },
		author: { type: String, required: true },
		bookmark: { type: Array },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Blog', BlogSchema);
