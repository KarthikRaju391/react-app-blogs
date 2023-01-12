import { useEffect, useState } from "react";
import { ImageList } from "./ImageList";

export const UnsplashSearch = ({ modalState, setModalState, setImage }) => {
	const [photos, setPhotos] = useState([]);
	const [keyword, setKeyword] = useState("blog");
	const accessKey = import.meta.env.VITE_ACCESS_KEY;
	const appURL = import.meta.env.VITE_UNSPLASH_URL;

	const url = new URL(`${appURL}?client_id=${accessKey}`);

	useEffect(() => {
		url.searchParams.set("query", keyword);
		const getDefaultPhotos = async () => {
			const response = await fetch(url);
			const data = await response.json();
			data.results && setPhotos(data.results);
		};

		getDefaultPhotos();
	}, []);

	const handleSearch = async (keyword) => {
		url.searchParams.set("query", keyword);
		const response = await fetch(url);
		const data = await response.json();
		data.results && setPhotos(data.results);
	};

	return (
		<div
			className="fixed md:w-1/2 h-[400px] z-10 shadow-2xl border-gray-600 rounded-xl outline-none overflow-x-hidden overflow-y-auto"
			tabIndex="-1"
		>
			<div className="w-auto pointer-events-none overflow-y-auto overflow-x-hidden">
				<div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
					<div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
						<h5
							className="text-xl font-medium leading-normal text-gray-800"
							id="exampleModalScrollableLabel"
						>
							Unsplash
						</h5>
						<button
							type="button"
							className=" border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
							onClick={() => setModalState((prev) => !prev)}
						>
							Close
						</button>
					</div>
					<div className="modal-body relative p-4">
						<div className="flex items-center">
							<input
								type="text"
								className="border w-full outline-none border-gray-300 p-2"
								placeholder="Type something"
								onChange={(e) =>
									setKeyword(e.currentTarget.value)
								}
							/>
							<button
								onClick={() => handleSearch(keyword)}
								className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
								search
							</button>
						</div>
						{photos.length > 0 && (
							<ImageList photos={photos} setImage={setImage} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
