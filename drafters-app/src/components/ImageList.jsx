import { ImageItem } from "./ImageItem";

export const ImageList = ({ photos, setImage }) => {
	console.log(photos);
	return (
		<div className="grid grid-cols-3 gap-3 mt-2">
			{photos.map((photo) => (
				<ImageItem
					imageUrl={photo.urls.regular}
					alt={photo.alt_description}
					setImage={setImage}
				/>
			))}
		</div>
	);
};
