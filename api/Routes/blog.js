const Blog = require("../Models/Blog");
const { verifyToken } = require("./verifyToken");
const router = require("express").Router();

// GET REQUESTS
router.get("/", async (req, res) => {
	const qAuthor = req.query.author;
	const qCategory = req.query.category;
	try {
		let blogs;
		if (qCategory && qAuthor) {
			blogs = await Blog.find({
				draft: false,
				category: qCategory,
				author: qAuthor,
			}).sort({ createdAt: -1 });
		} else if (qCategory) {
			blogs = await Blog.find({ draft: false, category: qCategory }).sort({
				createdAt: -1,
			});
		} else if (qAuthor) {
			blogs = await Blog.find({ draft: false, author: qAuthor }).sort({
				createdAt: -1,
			});
		} else {
			blogs = await Blog.find({ draft: false }).sort({ createdAt: -1 });
		}
		res.status(200).json(blogs);
	} catch (error) {
		res.status(500).json(error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		res.status(200).json(blog);
	} catch (error) {
		res.status(500).json(error.message);
	}
});

router.get("/user/:id", verifyToken, async (req, res) => {
	latest = req.query.latest;
	try {
		let userBlogs;

		if (latest) {
			userBlogs = await Blog.find({ userId: req.params.id, draft: false })
				.sort({ createdAt: -1 })
				.limit(1);
		} else {
			userBlogs = await Blog.find({
				userId: req.params.id,
				draft: false,
			}).sort({ createdAt: -1 });
		}
		res.status(200).json(userBlogs);
	} catch (error) {
		res.status(500).json(error.message);
	}
});

router.get("/drafts/user/:id", verifyToken, async (req, res) => {
	try {
		const drafts = await Blog.find({
			draft: true,
			userId: req.params.id,
		}).sort({ createdAt: -1 });
		res.status(200).json(drafts);
	} catch (error) {
		console.log("here");
		res.status(500).json(error.message);
	}
});

// POST REQUEST

router.post("/", verifyToken, async (req, res) => {
	const newBlog = new Blog({
		userId: req.user.id,
		title: req.body.title,
		body: req.body.body,
		category: req.body.category,
		draft: req.body.draft,
		image: req.body.image,
		author: `${req.user.firstname} ${req.user.lastname}`,
	});

	try {
		const savedBlog = await newBlog.save();
		res.status(201).json(savedBlog);
	} catch (error) {
		res.status(400).json(error._message);
	}
});

// PUT REQUEST

router.put("/:id", verifyToken, async (req, res) => {
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedBlog);
	} catch (error) {
		res.status(500).json(error.message);
	}
});

//DELETE REQUEST

router.delete("/:id", verifyToken, async (req, res) => {
	try {
		await Blog.findByIdAndDelete(req.params.id);
		res.status(200).json("Blog was deleted successfully!");
	} catch (error) {
		res.status(500).json(error.message);
	}
});

module.exports = router;
