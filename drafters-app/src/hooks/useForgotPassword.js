import { useState } from "react";

export const useForgotPassword = () => {
	const URL = import.meta.env.VITE_APP_URL;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const sendOTP = async (email) => {
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		try {
			console.log("Sending OTP to:", email);
			console.log("API URL:", `${URL}/auth/forgot-password`);
			
			const response = await fetch(`${URL}/auth/forgot-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			console.log("Response status:", response.status);
			const data = await response.json();
			console.log("Response data:", data);

			if (!response.ok) {
				setError(data.error || "Failed to send OTP");
				return { success: false };
			}

			setSuccess(true);
			return { success: true, message: data.message, maskedEmail: data.email };
		} catch (error) {
			console.error("Network error:", error);
			setError("Network error. Please check your connection and try again.");
			return { success: false };
		} finally {
			setIsLoading(false);
		}
	};

	const verifyOTP = async (email, otp) => {
		setIsLoading(true);
		setError(null);

		try {
			console.log("Verifying OTP:", { email, otp });
			
			const response = await fetch(`${URL}/auth/verify-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, otp }),
			});

			const data = await response.json();
			console.log("Verify OTP response:", data);

			if (!response.ok) {
				setError(data.error || "Failed to verify OTP");
				return { success: false };
			}

			return { success: true, resetToken: data.resetToken };
		} catch (error) {
			console.error("Network error:", error);
			setError("Network error. Please try again.");
			return { success: false };
		} finally {
			setIsLoading(false);
		}
	};

	const resetPassword = async (resetToken, newPassword) => {
		setIsLoading(true);
		setError(null);

		try {
			console.log("Resetting password with token");
			
			const response = await fetch(`${URL}/auth/reset-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ resetToken, newPassword }),
			});

			const data = await response.json();
			console.log("Reset password response:", data);

			if (!response.ok) {
				setError(data.error || "Failed to reset password");
				return { success: false };
			}

			return { success: true, message: data.message };
		} catch (error) {
			console.error("Network error:", error);
			setError("Network error. Please try again.");
			return { success: false };
		} finally {
			setIsLoading(false);
		}
	};

	return {
		sendOTP,
		verifyOTP,
		resetPassword,
		isLoading,
		error,
		success,
	};
};