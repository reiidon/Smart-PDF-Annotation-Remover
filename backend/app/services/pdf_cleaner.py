import cv2

from app.cv.pdf_converter import PDFConverter
from app.cv.image_processor import ImageProcessor
from app.cv.signature_detector import SignatureDetector
from app.cv.inpainter import Inpainter
from app.cv.pdf_builder import PDFBuilder


class PDFCleaner:

    def __init__(self):

        self.converter = PDFConverter()
        self.processor = ImageProcessor()
        self.detector = SignatureDetector()
        self.inpainter = Inpainter()
        self.builder = PDFBuilder()

    def clean_pdf(self, pdf_path, output_pdf):

        # Convert PDF pages to images
        image_paths = self.converter.pdf_to_images(pdf_path)

        cleaned_images = []

        for image_path in image_paths:

            print(f"\nProcessing: {image_path}")

            # Load image
            image = self.processor.load_image(image_path)

            # Convert to grayscale
            gray = self.processor.to_grayscale(image)

            # Remove noise
            blur = self.processor.remove_noise(gray)

            # Threshold image
            binary = self.processor.threshold(blur)

            # Detect signature regions
            regions = self.detector.detect_regions(binary)

            print(f"Detected {len(regions)} region(s)")

            # -----------------------------
            # DEBUG IMAGE
            # -----------------------------
            debug = image.copy()

            for (x, y, w, h) in regions:
                cv2.rectangle(
                    debug,
                    (x, y),
                    (x + w, y + h),
                    (0, 255, 0),
                    2
                )

            debug_path = image_path.replace(".png", "_detected.png")
            cv2.imwrite(debug_path, debug)

            print(f"Debug image saved: {debug_path}")

            # -----------------------------
            # Remove detected regions
            # -----------------------------
            cleaned = self.inpainter.remove_regions(
                image,
                regions
            )

            cleaned_path = image_path.replace(".png", "_clean.png")

            cv2.imwrite(cleaned_path, cleaned)

            print(f"Clean image saved: {cleaned_path}")

            cleaned_images.append(cleaned_path)

        # Build final PDF
        self.builder.images_to_pdf(
            cleaned_images,
            output_pdf
        )

        print(f"\nFinal PDF saved: {output_pdf}")

        return output_pdf