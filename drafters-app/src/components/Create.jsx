import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "../hooks/useBlogs";
import { Loading } from "./Loading";

export const Create = () => {
	const path = useLocation();
	const { createBlog, updateBlog, deleteBlog, error } = useBlogs();
	const [loadingState, setLoadingState] = useState(null);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [draft, setDraft] = useState(false);
	const [category, setCategory] = useState("Personal");
	const [setShowError] = useState(null);
	const [update, setUpdate] = useState(false);

	let blogId;
	if (path.pathname.split("/")[3] !== undefined) {
		blogId = path.pathname.split("/")[3];
	}

	useEffect(() => {
		blogId && setUpdate(true);

		window.addEventListener("beforeunload", alertUser);
		const fetchBlog = async () => {
			setLoadingState(true);
			try {
				const response = await fetch(
					`https://drafters.onrender.com/api/blogs/${blogId}`
				);
				const data = await response.json();
				setLoadingState(false);
				setTitle(data.title);
				setBody(data.body);
				setCategory(data.category);
				setDraft(data.draft);
			} catch (err) {
				setShowError(err);
			}
		};
		blogId && fetchBlog();

		return () => {
			setUpdate(false);
			window.removeEventListener("beforeunload", alertUser);
		};
	}, [path]);

	const alertUser = (e) => {
		e.preventDefault();
		e.returnValue = "";
	};

	const handleUpdate = async (e, draftState) => {
		e.preventDefault();
		if (draftState) {
			const newData = {
				title,
				body,
				category,
				draft: draftState,
			};
			updateBlog(blogId, newData, true, false, false, false);
		} else {
			const newData = {
				title,
				body,
				category,
				draft: draftState,
				createdAt: new Date().toISOString(),
			};
			updateBlog(blogId, newData, true, false, false, false);
		}
	};

	const handleCreate = async (e, draftState) => {
		e.preventDefault();
		if (draftState) {
			createBlog(title, body, category, true);
		} else {
			createBlog(title, body, category, false);
		}
	};
	const handleDraftSubmit = async (e, blog_id) => {
		e.preventDefault();
		createBlog(title, body, category, false);
		deleteBlog(blog_id, false, "none");
	};
	return (
		<div className="col-span-3 w-full md:w-3/4 mx-auto mt-11 min-h-screen">
			{loadingState ? (
				<Loading subtitle={"Loading..."} />
			) : (
				<form>
					<div className="input-section">
						<h2 className="text-2xl font-bold">
							{!update && !draft && "Enter the blog title"}
							{update && draft && "Update the draft title"}
							{update && !draft && "Update the blog title"}
						</h2>
						<div className="md:flex md:justify-between md:items-center">
							<input
								required
								className="input-area mt-3 w-full md:w-1/2 p-3 border font-semibold border-quill-border rounded-lg focus:outline-none focus:border-gray-800"
								placeholder="Introduction to Javascript"
								value={title || ""}
								type="text"
								onChange={(e) => setTitle(e.target.value)}
							/>
							<div className="flex items-center justify-start md:justify-between gap-2 mt-3 md:mt-0">
								<label
									className="text-xl font-semibold"
									htmlFor="categories"
								>
									Category
								</label>
								<select
									className="p-2 cursor-pointer rounded focus:outline-none border border-quill-border"
									value={category || "Personal"}
									onChange={(e) =>
										setCategory(e.target.value)
									}
									required
								>
									<option value="Personal">Personal</option>
									<option value="Tech">Tech</option>
									<option value="Self-help">Self-help</option>
									<option value="Entertainment">
										Entertainment
									</option>
									<option value="Lifestyle">Lifestyle</option>
								</select>
							</div>
						</div>
						{/* {error ? <div>{error}</div> : null} */}
					</div>
					<div className="input-section">
						<h2 className="mt-5 text-[23.5px] font-bold">
							{!update && !draft && "Enter the blog content"}
							{update && draft && "Update the draft content"}
							{update && !draft && "Update the blog content"}
						</h2>
						<ReactQuill
							className=""
							theme="snow"
							value={body || ""}
							onChange={setBody}
						/>
					</div>
					<div className="">
						{!update && !draft && (
							<div className="flex gap-y-2 flex-col md:flex-row md:gap-x-2 mt-28">
								<button
									name="final"
									className="border border-black hover:bg-gray-900 transition-all w-1/2 md:w-3/12 bg-gray-800 text-white px-2 py-3"
									onClick={(e) => handleCreate(e, false)}
								>
									Publish
								</button>
								<button
									name="final"
									className="border border-black hover:bg-gray-900 transition-all w-1/2 md:w-3/12 bg-gray-800 text-white px-2 py-3"
									onClick={(e) => handleCreate(e, true)}
								>
									Save as Draft
								</button>
							</div>
						)}
						{update && draft && (
							<div className="flex gap-y-2 flex-col md:flex-row md:mr-40 mt-28">
								<button
									name="final"
									className="border border-black hover:bg-gray-900 transition-all w-1/2 md:w-3/12 bg-gray-800 text-white px-2 py-3"
									onClick={(e) => handleUpdate(e, true)}
								>
									Update Draft
								</button>
								<button
									name="final"
									className="border border-black hover:bg-gray-900 transition-all w-1/2 md:w-3/12 md:ml-4 bg-gray-800 text-white px-2 py-3"
									onClick={(e) =>
										handleDraftSubmit(e, blogId)
									}
								>
									Publish Draft
								</button>
							</div>
						)}
						{update && !draft && (
							<div className="flex gap-y-2 flex-col md:flex-row md:mr-40 mt-28">
								<button
									name="final"
									className="border border-black hover:bg-gray-900 transition-all w-1/2 md:w-3/12 bg-gray-800 text-white px-2 py-3"
									onClick={(e) => handleUpdate(e, false)}
								>
									Update Blog
								</button>
							</div>
						)}
					</div>
				</form>
			)}
		</div>
	);
};
