from pathlib import Path
from ultralytics import YOLO


class SignatureDetector:

    def __init__(self):

        model_path = Path(__file__).parent / "models" / "best.pt"

        if not model_path.exists():
            raise FileNotFoundError(
                f"Model not found: {model_path}"
            )

        self.model = YOLO(str(model_path))

    def detect(self, image):

        results = self.model.predict(

            source=image,

            imgsz=2048,

            conf=0.05,

            iou=0.45,

            save=True,

            project="runs/detect/backend/debug",

            name="prediction",

            exist_ok=True,

            verbose=False

        )

        boxes = []

        for result in results:

            if result.boxes is None:
                continue

            for box in result.boxes:

                x1, y1, x2, y2 = map(
                    int,
                    box.xyxy[0].tolist()
                )

                confidence = float(box.conf[0])

                print(
                    f"Signature | "
                    f"{confidence:.2f} | "
                    f"({x1},{y1}) -> ({x2},{y2})"
                )

                boxes.append(
                    (x1, y1, x2, y2)
                )

        return boxes