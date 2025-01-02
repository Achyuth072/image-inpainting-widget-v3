import { useEffect, useRef, useState } from "react"
import { fabric } from 'fabric'
import BrushControls from "./BrushControls"
import ImageDisplay from "./ImageDisplay"
import './DrawingCanvas.css'

function DrawingCanvas({selectedImage}) {
    const canvasRef = useRef(null)
    const fabricCanvasRef = useRef(null)
    const [maskImage, setMaskImage] = useState(null)

    const handleSaveMask = () => {
        if (fabricCanvasRef.current) {
            // Create a temporary canvas for mask generation
            const tempCanvas = document.createElement('canvas')
            const ctx = tempCanvas.getContext('2d')
            tempCanvas.width = fabricCanvasRef.current.width
            tempCanvas.height = fabricCanvasRef.current.height

            // Store current canvas state
            const originalBackground = fabricCanvasRef.current.backgroundImage
            const originalObjects = [...fabricCanvasRef.current.getObjects()]
            
            // Clear canvas and set black background
            fabricCanvasRef.current.clear()
            fabricCanvasRef.current.backgroundImage = null
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

                // Set mask image
                setMaskImage(maskDataUrl)
            })
        }
    }

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
            <button className="save-button" onClick={handleSaveMask}>
                Save Mask
            </button>
            {selectedImage && maskImage && (
                <ImageDisplay 
                    originalImage={selectedImage} 
                    maskImage={maskImage} 
                />
            )}
        </div>
    )
}

export default DrawingCanvas