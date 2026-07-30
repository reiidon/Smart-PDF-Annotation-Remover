from pathlib import Path
from ultralytics import YOLO


def main():
    ROOT = Path(__file__).resolve().parents[2]

    data_yaml = ROOT / "ai" / "datasets" / "signatures" / "data.yaml"

    model = YOLO("yolo11n.pt")

    model.train(
        data=str(data_yaml),
        epochs=50,
        imgsz=640,
        batch=8,
        device=0,
        workers=0,
        project=str(ROOT / "ai" / "models"),
        name="signature_detector",
        pretrained=True,
        cache=False
    )


if __name__ == "__main__":
    main()