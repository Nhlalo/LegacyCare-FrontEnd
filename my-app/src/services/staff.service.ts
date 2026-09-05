import { ApiClient } from "@/lib/api";
import apiClient from "@/lib/api";
import { Staff } from "@/types";

export interface IStaffService {
  getStaff(includeInactive?: boolean): Promise<Staff[]>;
  inviteStaff(data: { email: string; role: string }): Promise<Staff>;
  updateRole(staffId: string, role: string): Promise<Staff>;
  removeStaff(staffId: string): Promise<void>;
  reactivateStaff(staffId: string): Promise<Staff>;
}

export class StaffService implements IStaffService {
  constructor(private apiClient: ApiClient) {}

  async getStaff(includeInactive: boolean = false): Promise<Staff[]> {
    const response = await this.apiClient.get<{
      success: boolean;
      data: Staff[];
    }>(`/staff${includeInactive ? "?includeInactive=true" : ""}`);
    return response.data;
  }

  async inviteStaff(data: { email: string; role: string }): Promise<Staff> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: Staff;
    }>("/staff/invite", data);
    return response.data;
  }

  async updateRole(staffId: string, role: string): Promise<Staff> {
    const response = await this.apiClient.put<{
      success: boolean;
      data: Staff;
    }>(`/staff/${staffId}/role`, { role });
    return response.data;
  }

  async removeStaff(staffId: string): Promise<void> {
    await this.apiClient.delete<{
      success: boolean;
      message: string;
    }>(`/staff/${staffId}`);
  }

  async reactivateStaff(staffId: string): Promise<Staff> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: Staff;
    }>(`/staff/${staffId}/reactivate`);
    return response.data;
  }
}

export const staffService = new StaffService(apiClient);
