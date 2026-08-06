import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Landing() {
    const navigate = useNavigate();

    const handleLearnMore = () => {
        const section = document.getElementById("features");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            {/* Hero Section */}
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

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition hover:bg-indigo-500"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={handleLearnMore}
                        className="rounded-xl border border-slate-700 px-8 py-4 transition hover:border-indigo-500"
                    >
                        Learn More
                    </button>

                </div>

            </section>

            {/* Features */}
            <section
                id="features"
                className="mx-auto max-w-6xl px-6 py-24"
            >

                <h2 className="mb-12 text-center text-4xl font-bold">
                    Features
                </h2>

                <div className="grid gap-8 md:grid-cols-3">

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                        <h3 className="mb-3 text-xl font-semibold">
                            AI Signature Removal
                        </h3>

                        <p className="text-slate-400">
                            Detect and remove handwritten and digital
                            signatures using a custom-trained YOLO model.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                        <h3 className="mb-3 text-xl font-semibold">
                            Smart PDF Cleaning
                        </h3>

                        <p className="text-slate-400">
                            Remove annotations, marks and unwanted
                            elements while preserving document quality.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                        <h3 className="mb-3 text-xl font-semibold">
                            AI Document Assistant
                        </h3>

                        <p className="text-slate-400">
                            Chat with documents, summarize content and
                            analyze resumes using AI.
                        </p>
                    </div>

                </div>

            </section>

            <Footer />
        </div>
    );
}