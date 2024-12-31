import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImageUploader from './ImageUploader'

describe('ImageUploader', () => {
    it('renders file input', () => {
        render(<ImageUploader />)
        const fileInput = screen.getByLabelText(/choose file/i)
        expect(fileInput).toBeInTheDocument()
    })

    it('shows preview when image is selected', async () => {
        render(<ImageUploader />)
        
        const file = new File(['test'], 'test.png', { type: 'image/png' })
        const fileInput = screen.getByLabelText(/choose file/i)
        
        fireEvent.change(fileInput, { target: { files: [file] } })
        
        expect(await screen.findByText('Preview:')).toBeInTheDocument()
    })
})