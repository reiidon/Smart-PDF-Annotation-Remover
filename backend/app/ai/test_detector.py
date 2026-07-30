import cv2
from yolo_detector import SignatureDetector

detector = SignatureDetector()

image = cv2.imread("C:/Users/shins/Desktop/Smart-PDF-Annotation-Remover/backend/app/ai/datasets/signatures/test/images/aji32e00-page02_2_jpg.rf.018cee1531c8ffe458b5225fdc2463d8.jpg") # replace with your test image

boxes = detector.detect(image)

print(boxes)

for x1, y1, x2, y2 in boxes:
    cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)

output_path = "prediction.jpg"

cv2.imwrite(output_path, image)

print(f"Saved to {output_path}")