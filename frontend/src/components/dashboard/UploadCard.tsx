export default function UploadCard() {
  return (
    <div className="mt-8 rounded-2xl border-2 border-dashed border-indigo-500 bg-slate-900 p-16 text-center">

      <h2 className="text-2xl font-semibold">
        Upload your PDF
      </h2>

      <p className="mt-3 text-slate-400">
        Drag & Drop your document here
      </p>

      <button className="mt-8 rounded-xl bg-indigo-600 px-8 py-3 hover:bg-indigo-500">
        Browse Files
      </button>

    </div>
  );
}