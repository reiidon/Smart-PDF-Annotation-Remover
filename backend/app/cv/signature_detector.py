import cv2


class SignatureDetector:

    def detect_regions(self, binary_image):

        height, width = binary_image.shape

        # Bottom 30% of page
        roi = binary_image[int(height * 0.70):height, :]

        # Join nearby pen strokes
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (25, 5))
        roi = cv2.dilate(roi, kernel, iterations=2)

        contours, _ = cv2.findContours(
            roi,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        candidates = []

        for contour in contours:

            area = cv2.contourArea(contour)

            if area < 300:
                continue

            x, y, w, h = cv2.boundingRect(contour)

            # Convert ROI coordinates back
            y += int(height * 0.70)

            padding = 20

            candidates.append((
                max(0, x - padding),
                max(0, y - padding),
                w + padding * 2,
                h + padding * 2
            ))

        print(f"Detected {len(candidates)} region(s)")

        return candidates