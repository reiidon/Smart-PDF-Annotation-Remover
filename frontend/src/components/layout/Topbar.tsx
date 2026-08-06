import {
  Bell,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          Welcome back to Scryva AI
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">

          <ShieldCheck
            size={18}
            className="text-emerald-400"
          />

          <span className="text-sm text-slate-300">
            YOLO Ready
          </span>

        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">

          <Cpu
            size={18}
            className="text-violet-400"
          />

          <span className="text-sm text-slate-300">
            AI Engine
          </span>

        </div>

        <button className="rounded-xl border border-slate-700 bg-slate-900 p-3 hover:bg-slate-800 transition">

          <Bell
            size={18}
            className="text-slate-300"
          />

        </button>

      </div>

    </header>
  );
}