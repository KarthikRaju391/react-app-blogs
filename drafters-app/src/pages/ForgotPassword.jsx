import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faTriangleExclamation as caution,
	faCheckCircle as success,
	faArrowLeft,
	faEnvelope,
	faKey,
	faLock
} from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const { sendOTP, verifyOTP, resetPassword, isLoading, error } = useForgotPassword();
	
	const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
	const [email, setEmail] = useState("");
	const [otp, setOTP] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [resetToken, setResetToken] = useState("");
	const [maskedEmail, setMaskedEmail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSendOTP = async (e) => {
		e.preventDefault();
		const result = await sendOTP(email);
		if (result.success) {
			setMaskedEmail(result.maskedEmail);
			setStep(2);
		}
	};

	const handleVerifyOTP = async (e) => {
		e.preventDefault();
		const result = await verifyOTP(email, otp);
		if (result.success) {
			setResetToken(result.resetToken);
			setStep(3);
		}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		
		if (newPassword !== confirmPassword) {
			return;
		}

		const result = await resetPassword(resetToken, newPassword);
		if (result.success) {
			setSuccessMessage("Password reset successfully! You can now login with your new password.");
			setTimeout(() => {
				navigate("/auth");
			}, 3000);
		}
	};

	const renderStep1 = () => (
		<div className="col-span-3 md:w-4/12 mx-auto h-screen mt-40 md:mt-20">
			<div className="text-center mb-8">
				<FontAwesomeIcon icon={faEnvelope} className="text-4xl text-gray-600 mb-4" />
				<h1 className="text-3xl font-bold">Forgot Password?</h1>
				<p className="text-gray-600 mt-2">Enter your email address and we'll send you an OTP to reset your password.</p>
			</div>
			
			<form onSubmit={handleSendOTP} className="flex flex-col">
				<label className="mt-4 font-medium" htmlFor="email">
					Email Address
				</label>
				<input
					className="border rounded p-3 font-medium text-black border-gray-300 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
					name="email"
					type="email"
					placeholder="Enter your email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				{error && (
					<div className="flex items-center justify-center gap-2 rounded bg-red-100 mt-5 border-red-400 border-2 py-3 px-4">
						<FontAwesomeIcon icon={caution} className="text-red-600" />
						<span className="text-red-700">{error}</span>
					</div>
				)}

				<button
					className="border transition-all border-gray-800 mt-6 w-full bg-gray-800 text-white px-4 py-3 rounded hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isLoading}
					type="submit"
				>
					<div className="flex justify-center gap-x-4 items-center">
						{isLoading ? "Sending OTP..." : "Send OTP"}
						{isLoading && (
							<svg
								className="animate-spin"
								width="15px"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								fill="white"
							>
								<path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
							</svg>
						)}
					</div>
				</button>

				<Link
					to="/auth"
					className="flex items-center justify-center gap-2 mt-6 text-gray-600 hover:text-gray-800 transition-colors"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					Back to Login
				</Link>
			</form>
		</div>
	);

	const renderStep2 = () => (
		<div className="col-span-3 md:w-4/12 mx-auto h-screen mt-40 md:mt-20">
			<div className="text-center mb-8">
				<FontAwesomeIcon icon={faKey} className="text-4xl text-blue-600 mb-4" />
				<h1 className="text-3xl font-bold">Enter OTP</h1>
				<p className="text-gray-600 mt-2">
					We've sent a 6-digit OTP to <strong>{maskedEmail}</strong>
				</p>
				<p className="text-sm text-gray-500 mt-1">The OTP will expire in 10 minutes</p>
			</div>
			
			<form onSubmit={handleVerifyOTP} className="flex flex-col">
				<label className="mt-4 font-medium" htmlFor="otp">
					Enter OTP
				</label>
				<input
					className="border rounded p-3 font-medium text-black border-gray-300 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 text-center text-2xl tracking-widest"
					name="otp"
					type="text"
					placeholder="000000"
					value={otp}
					onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
					maxLength="6"
					required
				/>

				{error && (
					<div className="flex items-center justify-center gap-2 rounded bg-red-100 mt-5 border-red-400 border-2 py-3 px-4">
						<FontAwesomeIcon icon={caution} className="text-red-600" />
						<span className="text-red-700">{error}</span>
					</div>
				)}

				<button
					className="border transition-all border-gray-800 mt-6 w-full bg-gray-800 text-white px-4 py-3 rounded hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isLoading || otp.length !== 6}
					type="submit"
				>
					<div className="flex justify-center gap-x-4 items-center">
						{isLoading ? "Verifying..." : "Verify OTP"}
						{isLoading && (
							<svg
								className="animate-spin"
								width="15px"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								fill="white"
							>
								<path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
							</svg>
						)}
					</div>
				</button>

				<button
					type="button"
					onClick={() => setStep(1)}
					className="flex items-center justify-center gap-2 mt-6 text-gray-600 hover:text-gray-800 transition-colors"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					Back to Email
				</button>
			</form>
		</div>
	);

	const renderStep3 = () => (
		<div className="col-span-3 md:w-4/12 mx-auto h-screen mt-40 md:mt-20">
			<div className="text-center mb-8">
				<FontAwesomeIcon icon={faLock} className="text-4xl text-green-600 mb-4" />
				<h1 className="text-3xl font-bold">Reset Password</h1>
				<p className="text-gray-600 mt-2">Enter your new password below</p>
			</div>
			
			<form onSubmit={handleResetPassword} className="flex flex-col">
				<label className="mt-4 font-medium" htmlFor="newPassword">
					New Password
				</label>
				<input
					className="border rounded p-3 font-medium text-black border-gray-300 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
					name="newPassword"
					type="password"
					placeholder="Enter new password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>

				<label className="mt-4 font-medium" htmlFor="confirmPassword">
					Confirm New Password
				</label>
				<input
					className="border rounded p-3 font-medium text-black border-gray-300 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
					name="confirmPassword"
					type="password"
					placeholder="Confirm new password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>

				{newPassword !== confirmPassword && confirmPassword && (
					<p className="text-red-600 text-sm mt-2">Passwords do not match</p>
				)}

				{error && (
					<div className="flex items-center justify-center gap-2 rounded bg-red-100 mt-5 border-red-400 border-2 py-3 px-4">
						<FontAwesomeIcon icon={caution} className="text-red-600" />
						<span className="text-red-700">{error}</span>
					</div>
				)}

				{successMessage && (
					<div className="flex items-center justify-center gap-2 rounded bg-green-100 mt-5 border-green-400 border-2 py-3 px-4">
						<FontAwesomeIcon icon={success} className="text-green-600" />
						<span className="text-green-700">{successMessage}</span>
					</div>
				)}

				<button
					className="border transition-all border-gray-800 mt-6 w-full bg-gray-800 text-white px-4 py-3 rounded hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isLoading || newPassword !== confirmPassword || !newPassword}
					type="submit"
				>
					<div className="flex justify-center gap-x-4 items-center">
						{isLoading ? "Resetting..." : "Reset Password"}
						{isLoading && (
							<svg
								className="animate-spin"
								width="15px"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								fill="white"
							>
								<path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
							</svg>
						)}
					</div>
				</button>
			</form>
		</div>
	);

	return (
		<div className="min-h-screen bg-background px-5 py-5">
			{step === 1 && renderStep1()}
			{step === 2 && renderStep2()}
			{step === 3 && renderStep3()}
		</div>
	);
};

export default ForgotPassword;