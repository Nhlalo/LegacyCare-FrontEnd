import { ApiClient } from "@/lib/api";
import apiClient from "@/lib/api";
import { Case } from "@/types";

export interface ICaseService {
  getCases(): Promise<Case[]>;
  getCase(id: string): Promise<Case>;
  createAtNeed(data: any): Promise<Case>;
  createPreNeed(data: any): Promise<Case>;
  updateCase(id: string, data: any): Promise<Case>;
  generateLink(caseId: string): Promise<{ token: string; link: string }>;
  sendLink(caseId: string, email: string): Promise<void>;
  closeCase(id: string): Promise<void>;
}

export class CaseService implements ICaseService {
  constructor(private apiClient: ApiClient) {}

  async getCases(): Promise<Case[]> {
    const response = await this.apiClient.get<{
      success: boolean;
      data: Case[];
    }>("/cases");
    return response.data;
  }

  async getCase(id: string): Promise<Case> {
    const response = await this.apiClient.get<{ success: boolean; data: Case }>(
      `/cases/${id}`,
    );
    return response.data;
  }

  async createAtNeed(data: any): Promise<Case> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: Case;
    }>("/cases/at-need", data);
    return response.data;
  }

  async createPreNeed(data: any): Promise<Case> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: Case;
    }>("/cases/pre-need", data);
    return response.data;
  }

  async updateCase(id: string, data: any): Promise<Case> {
    const response = await this.apiClient.put<{ success: boolean; data: Case }>(
      `/cases/${id}`,
      data,
    );
    return response.data;
  }

  async generateLink(caseId: string): Promise<{ token: string; link: string }> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: { token: string; link: string };
    }>("/cases/generate-link", { caseId });
    return response.data;
  }

  async sendLink(caseId: string, email: string): Promise<void> {
    await this.apiClient.post<{ success: boolean; message: string }>(
      "/cases/send-link",
      {
        caseId,
        email,
      },
    );
  }

  async closeCase(id: string): Promise<void> {
    await this.apiClient.post<{ success: boolean; message: string }>(
      `/cases/${id}/close`,
    );
  }
}

export const caseService = new CaseService(apiClient);
