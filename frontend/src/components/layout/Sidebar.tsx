import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  FileSearch,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Upload PDF",
    icon: Upload,
    path: "/dashboard/upload",
  },
  {
    name: "AI Chat",
    icon: MessageSquare,
    path: "/dashboard/chat",
  },
  {
    name: "ATS Analyzer",
    icon: FileSearch,
    path: "/dashboard/ats",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-indigo-500">
          Scryva AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Upload. Understand. Transform.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 text-xs text-slate-500 text-center">
        Scryva AI v1.0
      </div>
    </aside>
  );
}