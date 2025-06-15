const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransporter({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Send OTP email
const sendOTPEmail = async (email, otp, username) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Password Reset OTP - Drafters",
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #333; text-align: center;">Password Reset Request</h2>
				<div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<p>Hello <strong>${username}</strong>,</p>
					<p>You requested to reset your password for your Drafters account. Use the OTP below to reset your password:</p>
					<div style="text-align: center; margin: 30px 0;">
						<span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; background-color: #e9f4ff; padding: 15px 25px; border-radius: 8px; display: inline-block;">${otp}</span>
					</div>
					<p><strong>This OTP will expire in 10 minutes.</strong></p>
					<p>If you didn't request this password reset, please ignore this email.</p>
				</div>
				<div style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
					<p>This is an automated email from Drafters. Please do not reply to this email.</p>
				</div>
			</div>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		console.error("Email sending error:", error);
		return { success: false, error: error.message };
	}
};

module.exports = {
	sendOTPEmail,
};