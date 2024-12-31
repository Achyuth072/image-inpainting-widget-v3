import { useEffect, useRef } from "react"
import { fabric } from 'fabric'
import './DrawingCanvas.css'
import { use } from "react"

function DrawingCanvas({selectedImage}) {
    const canvasRef = useRef(null)
    const fabricCanvasRef = useRef(null)

    useEffect(() => {
        // Initialize the canvas
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            width: 800,
            height: 600,
        })

        // Set deafault brush options
        fabricCanvasRef.current.freeDrawingBrush.color = 'white'
        fabricCanvasRef.current.backgroundColor = 'black'


    }, [])

}