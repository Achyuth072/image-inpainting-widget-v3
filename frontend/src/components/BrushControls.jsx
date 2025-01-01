import { useEffect, useState } from "react"
import './BrushControls.css'

/**
 * BrushControls Component
 * Provides UI controls for brush size and color
 * @param {function} onBrushChange - Callback function when brush properties change
 */
function BrushControls({onBrushChange}) {
    // Intitliaze brush size and color states
    const [brushSize, setBrushSize] = useState(10)
    const [brushColor, setBrushColor] = useState('#ffffff')

    /**
     * Handle brush size slider changes
     * @param {Event} e - Range input change event
    */
    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value)
        setBrushSize(newSize)
        onBrushChange({size: newSize, color: brushColor})
    }

    /**
     * Handle brush color picker changes
     * @param {Event} e - Color input change event
     */
    const handleColorChange = (e) => {
        const newColor = e.target.value
        setBrushColor(newColor)
        onBrushChange({size: brushSize, color: newColor})
    }

    return (
        <div className="brush-controls">
            {/* Brush size control group */}
            <div className="control-group">
                <label>Brush Size:</label>
                <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={brushSize}
                    onChange={handleSizeChange}
                />
                <span>{brushSize}px</span>
            </div>
            {/* Brush color control group */}
            <div className="control-group">
                <label>Brush Color:</label>
                <input 
                    type="color" 
                    value={brushColor}
                    onChange={handleColorChange}
                />
            </div>
        </div>
    )
}

export default BrushControls