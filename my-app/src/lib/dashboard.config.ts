import { LucideIcon } from "lucide-react";

export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export function dashboardCard(
  id: string,
  title: string,
  value: string | number,
  icon: LucideIcon,
  color: string,
): DashboardCard {
  return { id, title, value, icon, color };
}
