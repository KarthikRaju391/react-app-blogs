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
			const response = await fetch(`${URL}/auth/forgot-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error);
				return { success: false };
			}

			setSuccess(true);
			return { success: true, message: data.message, maskedEmail: data.email };
		} catch (error) {
			setError("Network error. Please try again.");
			return { success: false };
		} finally {
			setIsLoading(false);
		}
	};

	const verifyOTP = async (email, otp) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`${URL}/auth/verify-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, otp }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error);
				return { success: false };
			}

			return { success: true, resetToken: data.resetToken };
		} catch (error) {
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
			const response = await fetch(`${URL}/auth/reset-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ resetToken, newPassword }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error);
				return { success: false };
			}

			return { success: true, message: data.message };
		} catch (error) {
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