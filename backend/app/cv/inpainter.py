import cv2
import numpy as np


class Inpainter:

    def remove_regions(self, image, regions):

        # Create an empty mask
        mask = np.zeros(image.shape[:2], dtype=np.uint8)

        # Draw detected regions on the mask
        for x, y, w, h in regions:

            padding = 10

            cv2.rectangle(
                mask,
                (max(0, x - padding), max(0, y - padding)),
                (min(image.shape[1], x + w + padding),
                min(image.shape[0], y + h + padding)),
                255,
                -1
            )

        # Remove regions using OpenCV Inpainting
        cleaned = cv2.inpaint(
            image,
            mask,
            5,
            cv2.INPAINT_TELEA
        )

        return cleaned