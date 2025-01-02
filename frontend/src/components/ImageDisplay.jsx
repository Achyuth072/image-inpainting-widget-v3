import './ImageDisplay.css'

function ImageDisplay({ originalImage, maskImage }) {
    return (
        <div className="image-display">
            <div className="image-container">
                <h3>Original Image</h3>
                <img src={originalImage} alt="Original" />
            </div>
            <div className="image-container">
                <h3>Mask</h3>
                <img src={maskImage} alt="Mask" />
            </div>
        </div>
    )
}

export default ImageDisplay