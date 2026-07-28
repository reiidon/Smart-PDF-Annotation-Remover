import cv2

class ImageProcessor:

    def load_image(self, image_path):
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Cannot load image: {image_path}")
        return image

    def to_grayscale(self, image):
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    def remove_noise(self, gray):
        return cv2.GaussianBlur(gray, (5, 5), 0)

    def threshold(self, gray):
        _, binary = cv2.threshold(
            gray,
            0,
            255,
            cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )
        return binary