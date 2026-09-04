import { useQuery } from "@tanstack/react-query";
import {
  dashboardService,
  IDashboardService,
} from "@/services/dashboard.service";

export const dashboardKeys = {
  stats: ["dashboard", "stats"] as const,
};

export function useDashboard(service: IDashboardService = dashboardService) {
  const { data, isLoading, error } = useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: () => service.getStats(),
  });

  return {
    stats: data,
    isLoading,
    error,
  };
}
