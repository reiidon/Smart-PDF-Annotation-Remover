export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <h2 className="text-xl font-semibold text-white">
        Dashboard
      </h2>

      <div className="text-slate-400">
        Welcome 👋
      </div>
    </header>
  );
}