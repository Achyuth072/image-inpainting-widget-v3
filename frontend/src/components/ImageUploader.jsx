import { useState } from 'react'
import './ImageUploader.css'

function ImageUploader() {
    // 1. Create a state to store the selected image
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [fileName, setFileName] = useState('No file chosen')

    // 2. Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file)
            setFileName(file.name)
            
            // 3. Create a FileReader to read the image
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return(
        <div className="image-uploader">
            {/* 4. File input */}
            <div className="file-input-container">
                <label htmlFor="image-input" className='file-input-label'>
                    Choose File
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <span className="file-name" >{fileName}</span>
            </div>    
            {/* 5. Image preview */}
            {imagePreview && (
                <div className="preview-container">
                    <h3>Preview:</h3>
                    <img src={imagePreview} alt="Preview" style={{maxWidth : '300px'}}/>
                </div>
            )}                                        
        </div>
    )
}

export default ImageUploader