import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-700
      bg-slate-900/80
      p-6
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-violet-500/40
      hover:shadow-2xl
      "
    >
      {/* Glow */}
      <div
        className={`absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-20 ${color}`}
      />

      <div className="relative">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon className="text-white" size={28} />
        </div>

        <p className="mt-6 text-sm uppercase tracking-widest text-slate-400">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          {value}
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          {subtitle}
        </p>

      </div>
    </div>
  );
}