import { useEffect, useRef, useState } from "react"
import { fabric } from 'fabric'
import BrushControls from "./BrushControls"
import './DrawingCanvas.css'

/**
 * DrawingCanvas Component
 * Provides a canvas for drawing on uploaded images using Fabric.js
 * @param {string} selectedImage - Base64 encoded image data
 */
function DrawingCanvas({selectedImage}) {
    // Refs to store canvas elements
    const canvasRef = useRef(null)
    const fabricCanvasRef = useRef(null)
    const [maskImage, setMaskImage] = useState(null) // State to store mask image


    const handleSaveMask = () => {
        if (fabricCanvasRef.current) {
            // Store current canvas properties
            const originalBackground = fabricCanvasRef.current.backgroundImage
            const originalObjects = [...fabricCanvasRef.current.getObjects()]
            
            // Remove all objects temporarily
            fabricCanvasRef.current.clear()
            fabricCanvasRef.current.backgroundImage = null

            // Create mask with white drawings on black background
            fabricCanvasRef.current.setBackgroundColor('black', () => {
                // Add back only the drawn paths in white
                originalObjects.forEach(obj => {
                    if (obj.type === 'path') {
                        obj.set({ stroke: 'white' })
                        fabricCanvasRef.current.add(obj)
                    }
                })

                // Export the mask
                const maskDataUrl = fabricCanvasRef.current.toDataURL({
                    format: 'png',
                    backgroundColor: 'black'
                })

                // Restore original canvas state
                fabricCanvasRef.current.clear()
                fabricCanvasRef.current.backgroundImage = originalBackground
                originalObjects.forEach(obj => {
                    fabricCanvasRef.current.add(obj)
                })
                fabricCanvasRef.current.renderAll()

                // Update mask preview
                setMaskImage(maskDataUrl)
            })
        }
    }

    /**
     * Updates brush properties when controls change
     * @param {Object} param0 - Object containing brush size and color
    */
    const handleBrushChange = ({size, color}) => {
        if (fabricCanvasRef.current) {
            fabricCanvasRef.current.freeDrawingBrush.width = size
            fabricCanvasRef.current.freeDrawingBrush.color = color
        }
    }

    useEffect(() => {
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            width: 800,
            height: 600
        })

        // Set black background
        fabricCanvasRef.current.setBackgroundColor('black', fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current))
        
        // Set white brush
        fabricCanvasRef.current.freeDrawingBrush.color = 'white'
        fabricCanvasRef.current.freeDrawingBrush.width = 10

        return () => {
            fabricCanvasRef.current.dispose()
        }
    }, [])

    useEffect(() => {
        if (selectedImage && fabricCanvasRef.current) {
            // convert base64 to fabric image
            fabric.Image.fromURL(selectedImage, (img) => {
                // Scale image to fit canvas
                const scale = Math.min(
                    fabricCanvasRef.current.width / img.width,
                    fabricCanvasRef.current.height / img.height
                )

                img.scale(scale)

                // Center image on canvas
                img.set({
                    left: (fabricCanvasRef.current.width - img.width * scale) / 2,
                    top: (fabricCanvasRef.current.height - img.height * scale) / 2,
                })

                // Clear canvas and draw image
                fabricCanvasRef.current.clear()
                fabricCanvasRef.current.add(img)
                fabricCanvasRef.current.renderAll()
            })
        }
    },[selectedImage])

    return (
        <div className="drawing-canvas-container">
            <BrushControls onBrushChange={handleBrushChange} />
            <canvas ref={canvasRef} />
            <button onClick={handleSaveMask}>Generate Mask</button>
            {maskImage && (
                <div className="preview-container">
                    <h3>Mask Preview:</h3>
                    <img src={maskImage} alt="Mask" style={{maxWidth: '300px'}} />
                </div>
            )}
        </div>
    )

}

export default DrawingCanvas