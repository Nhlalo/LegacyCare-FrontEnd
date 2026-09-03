import { authService } from "../auth.service";
import apiClient from "../../lib/api";

vi.mock("../../lib/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should call /auth/login with credentials", async () => {
      const mockData = { email: "test@test.com", password: "password123" };
      const mockResponse = {
        data: {
          success: true,
          data: {
            user: { id: "1", email: "test@test.com" },
            accessToken: "mock-token",
          },
        },
      };

      (apiClient.post as any).mockResolvedValue(mockResponse);

      const result = await authService.login(mockData);

      expect(apiClient.post).toHaveBeenCalledWith("/auth/login", mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("register", () => {
    it("should call /auth/register with user data", async () => {
      const mockData = {
        email: "test@test.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };

      await authService.register(mockData);

      expect(apiClient.post).toHaveBeenCalledWith("/auth/register", mockData);
    });
  });
});
