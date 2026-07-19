from pathlib import Path

from app.utils.file_manager import OUTPUT_FOLDER


class PDFWriter:

    @staticmethod
    def save(document, filename: str):

        output_path = OUTPUT_FOLDER / f"cleaned_{filename}"

        document.save(str(output_path))

        return output_path