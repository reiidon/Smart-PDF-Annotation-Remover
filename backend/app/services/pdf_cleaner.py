import cv2

from app.cv.pdf_converter import PDFConverter
from app.cv.image_processor import ImageProcessor
from app.ai.yolo_detector import SignatureDetector
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

        image_paths = self.converter.pdf_to_images(pdf_path)

        cleaned_images = []

        for image_path in image_paths:

            print(f"\nProcessing: {image_path}")

            image = self.processor.load_image(image_path)

            # Save original size
            original_height, original_width = image.shape[:2]

            # Upscale image for better small-object detection
            scale = 2.0

            image = cv2.resize(
                image,
                None,
                fx=scale,
                fy=scale,
                interpolation=cv2.INTER_CUBIC
            )

            boxes = self.detector.detect(image)

            print(f"Detected {len(boxes)} signature(s)")

            # Draw debug boxes
            debug = image.copy()

            for (x1, y1, x2, y2) in boxes:
                cv2.rectangle(
                    debug,
                    (x1, y1),
                    (x2, y2),
                    (0, 255, 0),
                    3
                )

            debug_path = image_path.replace(".png", "_detected.png")
            cv2.imwrite(debug_path, debug)

            print(f"Debug image saved: {debug_path}")

            cleaned = self.inpainter.remove_regions(
                image,
                boxes
            )

            # Resize back to original size
            cleaned = cv2.resize(
                cleaned,
                (original_width, original_height),
                interpolation=cv2.INTER_AREA
            )

            cleaned_path = image_path.replace(".png", "_clean.png")

            cv2.imwrite(cleaned_path, cleaned)

            print(f"Clean image saved: {cleaned_path}")

            cleaned_images.append(cleaned_path)

        self.builder.images_to_pdf(
            cleaned_images,
            output_pdf
        )

        print(f"\nFinal PDF saved: {output_pdf}")

        return output_pdf