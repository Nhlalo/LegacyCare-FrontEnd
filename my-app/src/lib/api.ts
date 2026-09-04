const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiClient {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data?: any): Promise<T>;
  put<T>(endpoint: string, data?: any): Promise<T>;
  patch<T>(endpoint: string, data?: any): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}

export const apiClient: ApiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const token = localStorage.getItem("accessToken");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      const newToken = localStorage.getItem("accessToken");
      headers.set("Authorization", `Bearer ${token}`);

      response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });
    }
  }

  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.data;
}

async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Refresh failed");
    }

    const data = await response.json();
    const { accessToken } = data.data;

    localStorage.setItem("accessToken", accessToken);

    return true;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    return false;
  }
}

export default apiClient;
