import { useState } from "react";
import {
  Upload,
  FileText,
  Download,
  Sparkles,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import { useProcessPdf } from "../../hooks/useProcessPdf";
import { downloadPdf } from "../../services/api";

export default function UploadCard() {
  const { process, loading } = useProcessPdf();

  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState("");
  const [progress, setProgress] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  async function handleProcess() {
    if (!file) return;

    try {
      setProgress("Uploading PDF...");
      setProgressValue(15);
      await new Promise((r) => setTimeout(r, 500));

      setProgress("Converting Pages...");
      setProgressValue(35);
      await new Promise((r) => setTimeout(r, 500));

      setProgress("Detecting Signatures...");
      setProgressValue(60);
      await new Promise((r) => setTimeout(r, 700));

      setProgress("Removing Signatures...");
      setProgressValue(80);

      const result = await process(file);

      setProgress("Generating Clean PDF...");
      setProgressValue(95);

      await new Promise((r) => setTimeout(r, 400));

      setOutput(result.output_file);

      setProgress("Completed ✅");
      setProgressValue(100);

      setTimeout(() => {
        setProgress("");
        setProgressValue(0);
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Failed to process PDF.");
      setProgress("");
      setProgressValue(0);
    }
  }

  function removeFile() {
    setFile(null);
    setOutput("");
    setProgress("");
    setProgressValue(0);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setOutput("");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white">Upload PDF</h2>

        <p className="mt-2 text-slate-400">
          Upload your scanned or digital PDF. Scryva AI will automatically
          detect signatures, remove annotations and generate a clean PDF.
        </p>

        {/* Upload Area */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`group mt-8 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 transition-all duration-300
          ${
            dragActive
              ? "border-violet-500 bg-violet-500/10"
              : "border-slate-700 bg-slate-950 hover:border-violet-500"
          }`}
        >
          <div className="rounded-2xl bg-violet-600/20 p-5 transition group-hover:scale-110">
            <Upload size={42} className="text-violet-400" />
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-white">
            Drag & Drop your PDF
          </h3>

          <p className="mt-2 text-slate-400">or click to browse files</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
              📄 PDF
            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
              🤖 AI Detection
            </span>

            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
              ✨ Auto Cleaning
            </span>
          </div>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];

              if (selectedFile) {
                setFile(selectedFile);
                setOutput("");
              }
            }}
          />
        </label>

        {/* Selected File */}
        {file && (
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-5">
            <div className="flex items-center gap-4">
              <FileText size={34} className="text-violet-400" />

              <div>
                <h4 className="font-semibold text-white">{file.name}</h4>

                <p className="text-sm text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" />

              <button
                onClick={removeFile}
                className="rounded-xl bg-red-500/15 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-300">{progress}</span>
              <span className="text-violet-400">{progressValue}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                style={{
                  width: `${progressValue}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleProcess}
            disabled={!file || loading}
            className="flex-1 rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:scale-[1.02] hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? (
              "🤖 AI Processing..."
            ) : (
              <>
                <Sparkles className="mr-2 inline" size={18} />
                Process PDF
              </>
            )}
          </button>

          {output && (
            <button
              onClick={() => downloadPdf(output)}
              className="rounded-2xl bg-emerald-600 px-6 text-white transition hover:bg-emerald-500"
            >
              <Download />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}