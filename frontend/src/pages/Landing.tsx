import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-indigo-300">
          AI Powered Document Intelligence
        </span>

        <h1 className="mt-8 text-7xl font-black">
          Scryva <span className="text-indigo-500">AI</span>
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-slate-400">
          Upload. Understand. Transform.
        </p>

        <p className="mt-3 max-w-2xl text-slate-500">
          Clean documents, remove signatures, summarize PDFs,
          analyze resumes and chat with your files using AI.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold hover:bg-indigo-500 transition">
            Get Started
          </button>

          <button className="rounded-xl border border-slate-700 px-8 py-4 hover:border-indigo-500 transition">
            Learn More
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}