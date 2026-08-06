import {
  ShieldCheck,
  Sparkles,
  FileText,
  Cpu,
  Bot,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import UploadCard from "../components/upload/UploadCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 p-10">

        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative z-10">

          <p className="text-violet-400 font-semibold tracking-widest uppercase">
            AI Powered Document Intelligence
          </p>

          <h1 className="mt-3 text-5xl font-black text-white">
            SCRYVA AI
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            Detect handwritten signatures, remove annotations,
            clean scanned PDFs and generate professional documents
            using Artificial Intelligence.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-violet-500 hover:scale-105">
              Upload PDF
            </button>

            <button className="rounded-2xl border border-slate-600 px-8 py-4 text-slate-300 hover:border-violet-500">
              Learn More
            </button>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="YOLO Model"
          value="READY"
          subtitle="AI Detection Online"
          icon={ShieldCheck}
          color="bg-emerald-500"
        />

        <StatCard
          title="AI Removal"
          value="ACTIVE"
          subtitle="OpenCV Inpainting"
          icon={Sparkles}
          color="bg-violet-500"
        />

        <StatCard
          title="PDF Engine"
          value="FAST"
          subtitle="Processing Pipeline"
          icon={FileText}
          color="bg-cyan-500"
        />

        <StatCard
          title="Version"
          value="v1.0"
          subtitle="Scryva AI"
          icon={Cpu}
          color="bg-orange-500"
        />

      </div>

      {/* Upload + AI Assistant */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <UploadCard />
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-violet-600/20 p-3">
              <Bot className="text-violet-400" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                AI Assistant
              </h2>

              <p className="text-slate-400">
                Coming Soon
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              📄 Summarize PDFs
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              💬 Ask Questions
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              🧠 Resume Analysis
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              🔎 OCR Search
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}