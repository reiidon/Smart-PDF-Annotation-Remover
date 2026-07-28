from pdf2image import convert_from_path
from app.config import POPPLER_PATH
from pathlib import Path
import os


class PDFConverter:
    def __init__(self):
        self.temp_dir = "backend/temp"
        os.makedirs(self.temp_dir, exist_ok=True)

    def pdf_to_images(self, pdf_path):
        """
        Convert PDF pages into images.
        Returns a list of image file paths.
        """

        images = convert_from_path(pdf_path,dpi=300,poppler_path=POPPLER_PATH)


        image_paths = []

        pdf_name = Path(pdf_path).stem

        for index, image in enumerate(images):

            image_path = os.path.join(
                self.temp_dir,
                f"{pdf_name}_page_{index + 1}.png"
            )

            image.save(image_path, "PNG")

            image_paths.append(image_path)

        return image_paths