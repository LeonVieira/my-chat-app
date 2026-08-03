function ImagePreview({ image, onRemove }) {

    if (!image) return null;

    return (
        <div className="image-preview">

            <button onClick={onRemove}>
                ×
            </button>

            <img
                src={URL.createObjectURL(image)}
                alt="Preview"
            />

            <p>{image.name}</p>

        </div>
    );
}

export default ImagePreview;