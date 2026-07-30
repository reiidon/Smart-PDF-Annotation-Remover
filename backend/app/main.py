from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.pdf import router as pdf_router

app = FastAPI(
    title="Smart PDF Annotation Remover",
    version="1.0.0",
    description="API for detecting and removing PDF annotations."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router)


@app.get("/")
def root():
    return {
        "message": "Smart PDF Annotation Remover API is Running!"
    }