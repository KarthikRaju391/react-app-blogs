const Blog = require('../Models/Blog');
const { verifyToken } = require('./verifyToken');
const router = require('express').Router();

// GET REQUESTS
router.get('/', async (req, res) => {
	const qAuthor = req.query.author;

	try {
		let blogs;

		if (qAuthor) {
			blogs = await Blog.find({ author: qAuthor });
		} else {
			blogs = await Blog.find();
		}
		res.status(200).json(blogs);
	} catch (error) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		res.status(200).json(blog);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/user/blogs', verifyToken, async (req, res) => {
	const qLatest = req.query.latest;

	try {
		let userBlogs;

		if (qLatest) {
			userBlogs = await Blog.find({ userId: req.user.id })
				.sort({ createdAt: -1 })
				.limit(1);
		} else {
			userBlogs = await Blog.find({ userId: req.user.id });
		}
		res.status(200).json(userBlogs);
	} catch (error) {
		res.status(500).json(err);
	}
});

// POST REQUEST

router.post('/', verifyToken, async (req, res) => {
	console.log(req);
	const newBlog = new Blog({
		userId: req.user.id,
		title: req.body.title,
		body: req.body.body,
		author: `${req.user.firstname} ${req.user.lastname}`,
	});

	try {
		const savedBlog = await newBlog.save();
		res.status(201).json(savedBlog);
	} catch (error) {
		rs.staus(500).json(error);
	}
});

// PUT REQUEST
router.put('/:id', verifyToken, async (req, res) => {
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
		res.status(500).json(error);
	}
});

//DELETE REQUEST

router.delete('/:id', verifyToken, async (req, res) => {
	try {
		await Blog.findByIdAndDelete(req.params.id);
		res.status(200).json('Blog was deleted successfully!');
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
