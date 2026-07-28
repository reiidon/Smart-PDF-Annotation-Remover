from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import shutil

from app.utils.file_manager import UPLOAD_FOLDER, OUTPUT_FOLDER
from app.services.pdf_reader import PDFReader
from app.services.annotation_detector import AnnotationDetector
from app.services.annotation_remover import AnnotationRemover
from app.services.pdf_writer import PDFWriter
from app.services.pdf_cleaner import PDFCleaner

router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)


# ==========================================================
# Upload PDF
# ==========================================================

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "success": True,
        "message": "PDF uploaded successfully.",
        "filename": file.filename
    }


# ==========================================================
# Detect Annotations
# ==========================================================

@router.get("/detect/{filename}")
async def detect_annotations(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="PDF not found."
        )

    document = PDFReader.open_pdf(str(file_path))

    annotations = AnnotationDetector.detect_annotations(document)

    document.close()

    return {
        "success": True,
        "filename": filename,
        "total_annotations": len(annotations),
        "annotations": annotations
    }


# ==========================================================
# Remove Annotations
# ==========================================================

@router.post("/remove/{filename}")
async def remove_annotations(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="PDF not found."
        )

    document = PDFReader.open_pdf(str(file_path))

    AnnotationRemover.remove_annotations(document)

    output_path = PDFWriter.save(document, filename)

    document.close()

    return {
        "success": True,
        "message": "Annotations removed successfully.",
        "filename": filename,
        "output_file": output_path.name
    }

# ==========================================================
# Remove Signatures
# ==========================================================

@router.post("/remove-signatures/{filename}")
async def remove_signatures(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="PDF not found."
        )

    output_path = OUTPUT_FOLDER / f"clean_{filename}"

    cleaner = PDFCleaner()

    cleaner.clean_pdf(
        str(file_path),
        str(output_path)
    )

    return {
        "success": True,
        "message": "Signatures removed successfully.",
        "output_file": output_path.name
    }

# ==========================================================
# Download Clean PDF
# ==========================================================

@router.get("/download/{filename}")
async def download_pdf(filename: str):

    output_path = OUTPUT_FOLDER / filename

    if not output_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Cleaned PDF not found."
        )

    return FileResponse(
        path=str(output_path),
        media_type="application/pdf",
        filename=filename
    )


# ==========================================================
# Health Check
# ==========================================================

@router.get("/health")
async def health():

    return {
        "success": True,
        "status": "Backend Running"
    }