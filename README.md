# Image Inpainting Widget v3

Learning to build a web application that allows users to upload an image, draw a mask on it, and export the original image and the mask image as a pair.

## Tech Stack

### Frontend

- React
- Fabric.js
- Axios
- Vite

<!-- ### Backend

- FastAPI
- Uvicorn
- SQLite
- SQLAlchemy
- AWS S3 (or local storage) -->

## Setup

### Frontend Setup

cd frontend
npm install
npm run dev

<!-- ### Backend Setup

cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload -->

## Features

- Image upload
- Interactive drawing canvas
- Adjustable brush controls
- Mask generation [Wip]
<!-- - Image pair export
- Image storage -->

## Project Structure

<!-- ### Frontend Directory

frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ImageUploader.jsx
│   │   ├── DrawingCanvas.jsx
│   │   ├── BrushControls.jsx
│   │   ├── ImageDisplay.jsx
│   │   └── App.jsx
│   ├── App.css
│   ├── index.js
│   └── services/
│       └── api.js
├── package.json
└── vite.config.js -->

<!-- ### Backend Directory

backend/
├── main.py
├── database.py
├── routers/
│   └── images.py
├── models.py
├── schemas.py
├── requirements.txt
└── storage.py -->

<!-- ## API Endpoints

- POST `/upload` - Upload original image
- PUT `/upload/{image_id}/mask` - Upload mask for image
- GET `/images/{image_id}` - Retrieve image pair -->

## Development

1. Clone the repository
2. Set up frontend ~~and backend~~ following the setup instructions
3. Start development servers
4. Access the application at <http://localhost:5173>
<!-- 3. Configure storage settings (AWS S3 credentials or local storage path) -->
