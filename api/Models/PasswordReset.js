const mongoose = require("mongoose");

const PasswordResetSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		otp: { type: String, required: true },
		expiresAt: { type: Date, required: true },
		used: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

// Auto-delete expired OTPs
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("PasswordReset", PasswordResetSchema);