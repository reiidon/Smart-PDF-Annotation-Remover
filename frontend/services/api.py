import requests

BASE_URL = "http://127.0.0.1:8000"


class APIService:

    @staticmethod
    def upload_pdf(uploaded_file):

        files = {
            "file": (
                uploaded_file.name,
                uploaded_file.getvalue(),
                "application/pdf"
            )
        }

        response = requests.post(
            f"{BASE_URL}/pdf/upload",
            files=files
        )

        response.raise_for_status()

        return response.json()

    @staticmethod
    def detect_annotations(filename):

        response = requests.get(
            f"{BASE_URL}/pdf/detect/{filename}"
        )

        response.raise_for_status()

        return response.json()

    @staticmethod
    def remove_annotations(filename):

        response = requests.post(
            f"{BASE_URL}/pdf/remove/{filename}"
        )

        response.raise_for_status()

        return response.json()

    @staticmethod
    def download_pdf(filename):

        response = requests.get(
            f"{BASE_URL}/pdf/download/{filename}"
        )

        response.raise_for_status()

        return response.content