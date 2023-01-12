export const ImageItem = ({ imageUrl, alt, setImage }) => {
	return (
		<div>
			<img
				onClick={() => {
					setImage(imageUrl);
				}}
				className="h-[150px] w-full hover:border hover:border-blue-500 transition-all duration-75 object-cover rounded-md cursor-pointer"
				src={imageUrl}
				alt={alt}
			/>
		</div>
	);
};
