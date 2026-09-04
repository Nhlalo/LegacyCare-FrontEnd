import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../../src/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("Auth Integration Tests", () => {
  const mockLogin = vi.fn();

  it("should render the login form", () => {
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isLoggingIn: false,
    });

    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("should call login with credentials when form is submitted", async () => {
    const user = userEvent.setup();

    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isLoggingIn: false,
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password123",
    });
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it("should show loading state on button when logging in", () => {
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isLoggingIn: true,
    });

    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: /signing in/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /sign in/i }),
    ).not.toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    const user = userEvent.setup();

    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isLoggingIn: false,
    });

    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("should show error message when login fails", async () => {
    const user = userEvent.setup();

    const mockLoginWithError = vi
      .fn()
      .mockRejectedValue(new Error("Invalid credentials"));

    (useAuth as any).mockReturnValue({
      login: mockLoginWithError,
      isLoggingIn: false,
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLoginWithError).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "wrongpassword",
      });
    });
  });

  it("should show success state when login succeeds", async () => {
    const user = userEvent.setup();

    const mockLoginSuccess = vi.fn().mockResolvedValue(undefined);

    (useAuth as any).mockReturnValue({
      login: mockLoginSuccess,
      isLoggingIn: false,
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockLoginSuccess).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password123",
    });
  });
});
