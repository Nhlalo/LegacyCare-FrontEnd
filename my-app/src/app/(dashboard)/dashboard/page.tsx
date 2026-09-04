import { DashboardContainer } from "@/components/dashboard/DashboardContainer";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      <DashboardContainer />
    </div>
  );
}
