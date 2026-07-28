# 📄 Smart PDF Annotation Remover

A Computer Vision project developed using **FastAPI**, **Streamlit**, and **PyMuPDF** to detect and remove annotations from PDF documents while preserving the original content.

---

## 📌 Project Overview

Smart PDF Annotation Remover is a desktop web application that allows users to upload a PDF, detect annotations such as highlights, ink, and comments, remove them, and download a cleaned version of the document.

The project provides a simple interface while maintaining the integrity of the original PDF.

---

## Current Features

- Upload PDF
- Detect PDF annotations
- Remove PDF annotations
- Convert scanned PDF pages to images
- OpenCV-based handwritten signature detection
- Rebuild cleaned PDF


## Current Limitations

The handwritten signature removal pipeline is implemented using OpenCV.
Detection accuracy depends on scan quality, handwriting style, and pen color.
Future work includes replacing the heuristic detector with a trained deep-learning model such as YOLO.



## 🛠 Technologies Used

### Backend
- FastAPI
- PyMuPDF (fitz)
- Python

### Frontend
- Streamlit
- Pandas

### Other Libraries
- Requests
- shutil

---

## 📁 Project Structure

```text
Smart-PDF-Annotation-Remover/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── outputs/
│   └── requirements.txt
│
├── frontend/
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── app.py
│   └── requirements.txt
│
├── docs/
├── sample_pdfs/
├── README.md
└── requirements.txt
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Smart-PDF-Annotation-Remover.git
```

### 2. Navigate to the project

```bash
cd Smart-PDF-Annotation-Remover
```

### 3. Install backend dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Install frontend dependencies

```bash
pip install -r frontend/requirements.txt
```

---

## ▶ Running the Backend

```bash
cd backend

uvicorn app.main:app --reload
```

Open:

```
http://127.0.0.1:8000/docs
```

---

## ▶ Running the Frontend

```bash
cd frontend

streamlit run app.py
```

---

## 🔄 Application Workflow

```text
Upload PDF
      │
      ▼
Detect Annotations
      │
      ▼
Display Results
      │
      ▼
Remove Annotations
      │
      ▼
Download Clean PDF
```

---

## 📸 Screenshots

Add screenshots here:

- Home Page
- Detection Results
- Annotation Table
- Download Screen

---

## 📈 Future Enhancements

- Password-protected PDF support
- OCR integration
- Batch PDF processing
- Drag & Drop upload
- Annotation preview
- Export analysis report

---

## 👨‍💻 Developer

**Shins Ramesh**

BCA (AI, VR & Robotics)

Computer Vision Project

2026

---

## 📄 License

This project was developed for educational purposes.