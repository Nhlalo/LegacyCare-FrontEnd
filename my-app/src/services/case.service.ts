import apiClient from "../lib/api";
import { Case } from "../types";

export const caseService = {
  getCases: () => apiClient.get<{ success: boolean; data: Case[] }>("/cases"),

  getCase: (id: string) =>
    apiClient.get<{ success: boolean; data: Case }>(`/cases/${id}`),

  createAtNeed: (data: any) =>
    apiClient.post<{ success: boolean; data: Case }>("/cases/at-need", data),

  createPreNeed: (data: any) =>
    apiClient.post<{ success: boolean; data: Case }>("/cases/pre-need", data),

  updateCase: (id: string, data: any) =>
    apiClient.put<{ success: boolean; data: Case }>(`/cases/${id}`, data),

  generateLink: (caseId: string) =>
    apiClient.post<{ success: boolean; data: { token: string; link: string } }>(
      "/cases/generate-link",
      { caseId },
    ),

  sendLink: (caseId: string, email: string) =>
    apiClient.post<{ success: boolean; message: string }>("/cases/send-link", {
      caseId,
      email,
    }),

  closeCase: (id: string) =>
    apiClient.post<{ success: boolean; message: string }>(`/cases/${id}/close`),

  getCaseByToken: (token: string) =>
    apiClient.get<{ success: boolean; data: Case }>(`/cases/public/${token}`),
};
