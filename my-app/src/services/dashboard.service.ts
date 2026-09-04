import apiClient from "@/lib/api";
import { DashboardStats } from "@/types";

export interface IDashboardService {
  getStats(): Promise<DashboardStats>;
}

export class DashboardService implements IDashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<{
      success: boolean;
      data: DashboardStats;
    }>("/dashboard/overview");
    return response.data;
  }
}

export const dashboardService = new DashboardService();
