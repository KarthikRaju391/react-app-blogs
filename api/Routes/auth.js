const User = require('../Models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

function createToken(user) {
	return jwt.sign(
		{
			id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
		},
		process.env.JWT_SEC,
		{ expiresIn: '3d' }
	);
}

router.post('/signup', async (req, res) => {
	const { firstname, lastname, username, email, password } = req.body;
	try {
		const newUser = await User.signup(
			firstname,
			lastname,
			username,
			email,
			password
		);

		const accessToken = createToken(newUser);
		const userId = newUser._id;
		res.status(200).json({ username, accessToken, userId });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.login(username, password);
		const userId = user._id;
		const accessToken = createToken(user);

		res.status(200).json({ username, accessToken, userId });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
