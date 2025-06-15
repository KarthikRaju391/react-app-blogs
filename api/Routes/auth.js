const User = require("../Models/User");
const PasswordReset = require("../Models/PasswordReset");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { sendOTPEmail } = require("../utils/emailService");

function createToken(user) {
	return jwt.sign(
		{
			id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
		},
		process.env.JWT_SEC,
		{ expiresIn: "3d" }
	);
}

// Generate 6-digit OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/signup", async (req, res) => {
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
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", async (req, res) => {
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

// Forgot Password - Send OTP to email
router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;

	try {
		if (!email) {
			return res.status(400).json({ error: "Email is required" });
		}

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "No account found with this email address" });
		}

		// Generate OTP
		const otp = generateOTP();
		const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

		// Delete any existing OTPs for this email
		await PasswordReset.deleteMany({ email });

		// Save OTP to database
		const passwordReset = new PasswordReset({
			email,
			otp,
			expiresAt,
		});
		await passwordReset.save();

		// Send OTP via email
		const emailResult = await sendOTPEmail(email, otp, user.username);
		
		if (!emailResult.success) {
			return res.status(500).json({ error: "Failed to send OTP email. Please try again." });
		}

		res.status(200).json({ 
			message: "OTP sent to your email address. Please check your inbox.",
			email: email.replace(/(.{2})(.*)(@.*)/, "$1***$3") // Mask email for security
		});
	} catch (error) {
		console.error("Forgot password error:", error);
		res.status(500).json({ error: "Something went wrong. Please try again." });
	}
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
	const { email, otp } = req.body;

	try {
		if (!email || !otp) {
			return res.status(400).json({ error: "Email and OTP are required" });
		}

		// Find valid OTP
		const passwordReset = await PasswordReset.findOne({
			email,
			otp,
			used: false,
			expiresAt: { $gt: new Date() }
		});

		if (!passwordReset) {
			return res.status(400).json({ error: "Invalid or expired OTP" });
		}

		// Mark OTP as used
		passwordReset.used = true;
		await passwordReset.save();

		// Generate temporary token for password reset
		const resetToken = jwt.sign(
			{ email, purpose: "password-reset" },
			process.env.JWT_SEC,
			{ expiresIn: "15m" }
		);

		res.status(200).json({ 
			message: "OTP verified successfully",
			resetToken 
		});
	} catch (error) {
		console.error("OTP verification error:", error);
		res.status(500).json({ error: "Something went wrong. Please try again." });
	}
});

// Reset Password
router.post("/reset-password", async (req, res) => {
	const { resetToken, newPassword } = req.body;

	try {
		if (!resetToken || !newPassword) {
			return res.status(400).json({ error: "Reset token and new password are required" });
		}

		// Verify reset token
		const decoded = jwt.verify(resetToken, process.env.JWT_SEC);
		if (decoded.purpose !== "password-reset") {
			return res.status(400).json({ error: "Invalid reset token" });
		}

		// Find user
		const user = await User.findOne({ email: decoded.email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Validate new password
		const validator = require("validator");
		if (!validator.isStrongPassword(newPassword)) {
			return res.status(400).json({ error: "Password not strong enough" });
		}

		// Update password
		user.password = CryptoJS.AES.encrypt(newPassword, process.env.PASS_SEC).toString();
		await user.save();

		// Clean up used OTPs for this email
		await PasswordReset.deleteMany({ email: decoded.email });

		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
			return res.status(400).json({ error: "Invalid or expired reset token" });
		}
		console.error("Password reset error:", error);
		res.status(500).json({ error: "Something went wrong. Please try again." });
	}
});

module.exports = router;