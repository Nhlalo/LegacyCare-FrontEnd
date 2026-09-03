import apiClient from "../lib/api";
import { User } from "../types";

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

export const authService = {
  register: (data: RegisterData) =>
    apiClient.post<{ success: boolean; data: AuthResponse }>(
      "/auth/register",
      data,
    ),

  login: (data: LoginData) =>
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
