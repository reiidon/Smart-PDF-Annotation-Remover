from pathlib import Path
from ultralytics import YOLO


class SignatureDetector:
    def __init__(self):
        model_path = Path(__file__).parent / "models" / "best.pt"
        self.model = YOLO(str(model_path))

    def detect(self, image):
        """
        Detect signatures in an OpenCV image.

        Returns:
            List of bounding boxes:
            [(x1, y1, x2, y2), ...]
        """
        results = self.model.predict(
            source=image,
            conf=0.35,
            verbose=False
        )

        boxes = []

        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                boxes.append((x1, y1, x2, y2))

        return boxes