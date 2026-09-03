import apiClient from "../lib/api";
import { AuthResponse } from "../types";

export const authService = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>(
      "/auth/register",
      data,
    ),

  login: (data: { email: string; password: string }) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>(
      "/auth/login",
      data,
    ),

  verifyEmail: (token: string) =>
    apiClient.post<{ success: boolean; message: string }>(
      "/auth/verify-email",
      { token },
    ),

  forgotPassword: (email: string) =>
    apiClient.post<{ success: boolean; message: string }>(
      "/auth/forgot-password",
      { email },
    ),

  resetPassword: (token: string, password: string) =>
    apiClient.post<{ success: boolean; message: string }>(
      "/auth/reset-password",
      { token, password },
    ),

  logout: () =>
    apiClient.post<{ success: boolean; message: string }>("/auth/logout"),
};
