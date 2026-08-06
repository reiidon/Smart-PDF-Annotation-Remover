import cv2
import numpy as np


class Inpainter:

    def remove_regions(self, image, boxes):

        # Create empty mask
        mask = np.zeros(image.shape[:2], dtype=np.uint8)

        for (x1, y1, x2, y2) in boxes:

            padding = 12

            x1 = max(0, x1 - padding)
            y1 = max(0, y1 - padding)
            x2 = min(image.shape[1], x2 + padding)
            y2 = min(image.shape[0], y2 + padding)

            cv2.rectangle(
                mask,
                (x1, y1),
                (x2, y2),
                255,
                -1
            )

        cleaned = cv2.inpaint(
            image,
            mask,
            7,
            cv2.INPAINT_TELEA
        )

        return cleaned