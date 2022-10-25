import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "../hooks/useBlogs";

export const Create = () => {
	const path = useLocation();
	const { createBlog, updateBlog } = useBlogs();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [draft, setDraft] = useState(false);
	const [category, setCategory] = useState("");
	const [error, setError] = useState(null);
	const [update, setUpdate] = useState(false);

	let blogId;
	if (path.pathname.split("/")[3] !== undefined) {
		blogId = path.pathname.split("/")[3];
	}

	useEffect(() => {
		blogId && setUpdate(true);

		const fetchBlog = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/api/blogs/${blogId}`
				);
				const data = await response.json();
				setTitle(data.title);
				setBody(data.body);
				setCategory(data.category);
			} catch (error) {
				setError(error);
			}
		};
		blogId && fetchBlog();

		return () => {
			setUpdate(false);
		};
	}, []);

	const handleUpdate = async (e) => {
		e.preventDefault();
		const newData = {
			title,
			body,
			category,
		};
		updateBlog(blogId, newData, true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (e.nativeEvent.submitter.name == "final") {
			createBlog(title, body, category, false);
		} else {
			createBlog(title, body, category, true);
		}
	};

	return (
		<div className="col-span-3 w-3/4 mx-auto mt-11 min-h-screen">
			<form onSubmit={update ? handleUpdate : handleSubmit}>
				<div className="input-section">
					<h2 className="text-2xl font-bold">
						{update ? "Update" : "Enter"} the blog title
					</h2>
					<div className="flex justify-between items-center">
						<input
							required
							className="input-area mt-3 w-1/2 p-3 border font-semibold border-quill-border rounded-lg focus:outline-none focus:border-gray-800"
							placeholder="Introduction to Javascript"
							value={title || ""}
							type="text"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<div className="flex items-center gap-2">
							<label
								className="text-xl font-semibold"
								htmlFor="categories"
							>
								Category
							</label>
							<select
								className="p-2 cursor-pointer rounded focus:outline-none border border-quill-border"
								value={category || ""}
								onChange={(e) => setCategory(e.target.value)}
								required
							>
								<option value="Personal">Personal</option>
								<option value="Tech">Tech</option>
								<option value="Self-help">Self-help</option>
								<option value="Entertainment">Entertainment</option>
								<option value="Lifestyle">Lifestyle</option>
							</select>
						</div>
					</div>
				</div>
				<div className="input-section">
					<h2 className="mt-5 text-[23.5px] font-bold">
						{update ? "Update" : "Enter"} the blog content
					</h2>
					<ReactQuill
						className=""
						theme="snow"
						value={body || ""}
						onChange={setBody}
					/>
				</div>
				<div>
					<button
						type="submit"
						name="final"
						className="border border-black mt-28 hover:bg-gray-900 transition-all w-3/12 mx-auto bg-gray-800 text-white px-2 py-3"
					>
						{update ? "Update" : "Publish"}
					</button>
					{!update && (
						<button
							type="submit"
							name="draft"
							className="border ml-10 border-black mt-28 hover:bg-gray-900 transition-all w-3/12 mx-auto bg-gray-800 text-white px-2 py-3"
						>
							Save as Draft
						</button>
					)}
				</div>
				{error && <div>{error}</div>}
			</form>
		</div>
	);
};
