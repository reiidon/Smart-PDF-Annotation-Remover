import StatCard from "../components/dashboard/StatCard";
import UploadCard from "../components/upload/UploadCard";

export default function Dashboard() {
    return (
        <div className="space-y-8 p-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Welcome to Scryva AI. Upload your PDF to remove annotations and signatures.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    title="Documents"
                    value="12"
                    subtitle="Processed PDFs"
                />

                <StatCard
                    title="AI Chats"
                    value="8"
                    subtitle="Completed"
                />

                <StatCard
                    title="ATS Score"
                    value="92%"
                    subtitle="Latest Resume"
                />
            </div>

            {/* Upload Section */}
            <UploadCard />

        </div>
    );
}