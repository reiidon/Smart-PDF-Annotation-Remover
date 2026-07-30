import cv2
import numpy as np


class Inpainter:

    def remove_regions(self, image, regions):

        cleaned = image.copy()

        for x, y, w, h in regions:

            padding = 8

            x1 = max(0, x - padding)
            y1 = max(0, y - padding)
            x2 = min(image.shape[1], x + w + padding)
            y2 = min(image.shape[0], y + h + padding)

            cleaned[y1:y2, x1:x2] = (255, 255, 255)

        return cleaned