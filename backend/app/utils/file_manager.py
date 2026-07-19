from pathlib import Path

UPLOAD_FOLDER = Path("uploads")
OUTPUT_FOLDER = Path("outputs")
TEMP_FOLDER = Path("temp")

UPLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)
TEMP_FOLDER.mkdir(exist_ok=True)