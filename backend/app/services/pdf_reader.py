import fitz


class PDFReader:

    @staticmethod
    def open_pdf(pdf_path: str):
        return fitz.open(pdf_path)