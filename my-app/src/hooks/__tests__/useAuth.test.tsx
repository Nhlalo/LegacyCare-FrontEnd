import { renderHook, waitFor } from "@testing-library/react";
import { createWrapper, mockLocalStorage } from "@/test/test-utils";
import { useAuth } from "../useAuth";
import { authService } from "../../services/auth.service";
import { toast } from "sonner";

vi.mock("../../services/auth.service", () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  },
}));

vi.spyOn(global, "localStorage", "get").mockReturnValue(
  mockLocalStorage as any,
);

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
  });

  it("should return isAuthenticated false when no token", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
    });
    expect(result.current.user).toBeUndefined();
  });

  it("should return isAuthenticated true when token exists", async () => {
    mockLocalStorage.setItem("accessToken", "mock-token");
    mockLocalStorage.setItem(
      "user",
      JSON.stringify({ id: "1", email: "test@test.com" }),
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.user).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe("test@test.com");
    });
  });

  it("should call login mutation", async () => {
    const mockLogin = vi.fn().mockResolvedValue({
      data: {
        user: { id: "1", email: "test@test.com" },
        accessToken: "mock-token",
      },
    });

    (authService.login as any).mockImplementation(mockLogin);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.login({ email: "test@test.com", password: "password123" });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockLogin.mock.calls[0][0]).toEqual({
        email: "test@test.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Welcome back!");
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      "mock-token",
    );
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "user",
      expect.any(String),
    );
  });

  it("should handle login error", async () => {
    const mockError = {
      response: {
        data: { error: "Invalid credentials" },
      },
    };

    (authService.login as any).mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.login({ email: "test@test.com", password: "wrongpassword" });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      const call = (toast.error as any).mock.calls[0];
      expect(call[0]).toMatch(/Login failed|Invalid credentials/);
    });
  });

  it("should logout successfully", async () => {
    mockLocalStorage.setItem("accessToken", "mock-token");
    mockLocalStorage.setItem(
      "user",
      JSON.stringify({ id: "1", email: "test@test.com" }),
    );

    const mockLogout = vi.fn().mockResolvedValue({ data: { success: true } });
    (authService.logout as any).mockImplementation(mockLogout);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.user).toBeTruthy();
    });

    result.current.logout();

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("accessToken");
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("user");
      expect(toast.success).toHaveBeenCalledWith("Logged out successfully");
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
