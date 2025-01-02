import ImageUploader from './components/ImageUploader'
import './App.css'

function App() {

  return (
    <div>
      <h1>Image Inpainting Widget</h1>
      <p>Upload an image and draw a mask on it</p>
      <ImageUploader />
    </div>
  )
}

export default App
