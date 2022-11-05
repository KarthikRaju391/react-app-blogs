const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		username: { type: String, unique: true },
		email: { type: String, unique: true },
		password: { type: String },
		likedBlogs: [
			{
				blogId: {
					type: String,
				},
			},
		],
		bookmarkedBlogs: [
			{
				blogId: {
					type: String,
				},
			},
		],
		avatar: { type: String, default: null },
	},
	{ timestamps: true }
);

UserSchema.statics.signup = async function (
	firstname,
	lastname,
	username,
	email,
	password
) {
	if (!email || !password || !username || !firstname || !lastname) {
		throw Error("All fields must be filled");
	}

	if (!validator.isEmail(email)) {
		throw Error("Email is not valid");
	}

	if (!validator.isStrongPassword(password)) {
		throw Error("Password not strong enough");
	}

	const emailExists = await this.findOne({ email: email });
	const usernameExists = await this.findOne({ username: username });

	if (emailExists) throw Error("Email already in use...");
	if (usernameExists) throw Error("Username already in use...");

	const newUser = await this.create({
		firstname,
		lastname,
		username,
		email,
		password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
	});

	return newUser;
};

UserSchema.statics.login = async function (username, password) {
	if (!username || !password) {
		throw Error("All fields must be filled...");
	}

	const user = await this.findOne({ username });

	if (!user) {
		throw Error("Incorrect username");
	}

	const hashedPassword = CryptoJS.AES.decrypt(
		user.password,
		process.env.PASS_SEC
	);

	const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

	if (originalPassword !== password) {
		throw Error("Incorrect password");
	}

	return user;
};

module.exports = mongoose.model("User", UserSchema);
