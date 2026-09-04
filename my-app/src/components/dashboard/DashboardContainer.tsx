"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { dashboardCard } from "@/lib/dashboard.config";
import { DashboardCard } from "./DashboardCard";
import { Users, FileText, DollarSign, Clock } from "lucide-react";
import { Loader2 } from "lucide-react";

export function DashboardContainer() {
  const { stats, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const cards = [
    dashboardCard(
      "total-cases",
      "Total Cases",
      stats?.totalCases || 0,
      FileText,
      "text-blue-600",
    ),
    dashboardCard(
      "open-cases",
      "Open Cases",
      stats?.openCases || 0,
      Clock,
      "text-yellow-600",
    ),
    dashboardCard(
      "revenue",
      "Revenue",
      `$${stats?.totalRevenue?.toLocaleString() || 0}`,
      DollarSign,
      "text-green-600",
    ),
    dashboardCard(
      "staff",
      "Staff",
      stats?.staffCount || 0,
      Users,
      "text-purple-600",
    ),
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <DashboardCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={<card.icon className="h-4 w-4" />}
          color={card.color}
        />
      ))}
    </div>
  );
}
