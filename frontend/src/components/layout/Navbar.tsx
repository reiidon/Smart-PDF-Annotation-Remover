import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-500"
        >
          Scryva AI
        </Link>

        <div className="flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-white">
            Features
          </a>

          <a href="#about" className="text-slate-300 hover:text-white">
            About
          </a>

          <button className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold hover:bg-indigo-500 transition">
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}