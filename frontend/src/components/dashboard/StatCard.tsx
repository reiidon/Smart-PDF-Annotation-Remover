interface StatCardProps {
    title: string;
    value: string;
    subtitle: string;
}

export default function StatCard({
    title,
    value,
    subtitle,
}: StatCardProps) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500">
                {title}
            </h3>

            <p className="mt-2 text-3xl font-bold text-gray-900">
                {value}
            </p>

            <p className="mt-2 text-sm text-gray-500">
                {subtitle}
            </p>
        </div>
    );
}