import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Download,
  Settings,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "PDF Cleaner",
    icon: FileText,
    path: "/dashboard/upload",
  },
  {
    name: "Downloads",
    icon: Download,
    path: "/dashboard/downloads",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-violet-600 p-3">
            <Cpu size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Scryva AI
            </h1>

            <p className="text-sm text-slate-400">
              Document Intelligence
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >

              <Icon size={22} />

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>

          );
        })}

      </nav>

      {/* Status */}

      <div className="border-t border-slate-800 p-5">

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">

          <div className="flex items-center gap-3">

            <ShieldCheck
              className="text-emerald-400"
              size={22}
            />

            <div>

              <p className="font-semibold text-white">
                AI Status
              </p>

              <p className="text-xs text-slate-400">
                YOLO Ready
              </p>

            </div>

          </div>

          <div className="mt-4 space-y-2 text-sm">

            <div className="flex justify-between">
              <span className="text-slate-400">
                Backend
              </span>

              <span className="text-emerald-400">
                ● Online
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                AI Engine
              </span>

              <span className="text-emerald-400">
                ● Loaded
              </span>
            </div>

          </div>

        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Scryva AI v1.0
        </p>

      </div>

    </aside>
  );
}