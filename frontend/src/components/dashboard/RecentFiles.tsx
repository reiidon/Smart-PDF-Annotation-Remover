export default function RecentFiles() {
  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Documents
      </h2>

      <div className="space-y-4">

        <div className="rounded-xl bg-slate-800 p-4">
          Resume.pdf
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          Report.pdf
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          Invoice.pdf
        </div>

      </div>

    </div>
  );
}