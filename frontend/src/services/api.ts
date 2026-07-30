import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export default api;

export function downloadPdf(filename: string) {
    window.open(
        `http://127.0.0.1:8000/pdf/download/${filename}`,
        "_blank"
    );
}