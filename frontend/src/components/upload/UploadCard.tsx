import { useState } from "react";
import { Upload, FileText, Download } from "lucide-react";
import { useProcessPdf } from "../../hooks/useProcessPdf";
import { downloadPdf } from "../../services/api";

export default function UploadCard() {
    const { process, loading } = useProcessPdf();

    const [file, setFile] = useState<File | null>(null);
    const [output, setOutput] = useState("");

    async function handleProcess() {
        if (!file) return;

        try {
            const result = await process(file);
            setOutput(result.output_file);
        } catch (error) {
            console.error(error);
            alert("Failed to process PDF.");
        }
    }

    return (
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">
                Upload PDF
            </h2>

            <p className="mt-2 text-gray-500">
                Upload your PDF to remove annotations and signatures.
            </p>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 hover:border-blue-500">

                <Upload size={40} />

                <p className="mt-3 font-medium">
                    Click to choose a PDF
                </p>

                <p className="text-sm text-gray-500">
                    Only PDF files are supported
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const selectedFile = event.target.files?.[0];

                        if (selectedFile) {
                            setFile(selectedFile);
                        }
                    }}
                />
            </label>

            {file && (
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-gray-100 p-4">
                    <FileText size={24} />

                    <div>
                        <p className="font-medium">
                            {file.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>
            )}

            <button
                onClick={handleProcess}
                disabled={!file || loading}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Processing..." : "Process PDF"}
            </button>

            {output && (
                <button
                    onClick={() => downloadPdf(output)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                >
                    <Download size={20} />
                    Download Clean PDF
                </button>
            )}
        </div>
    );
}