import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../Header";
import { useAuth } from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("Header", () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      user: {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
      },
      logout: mockLogout,
      isLoggingOut: false,
    });
  });

  it("should render user avatar with initials", () => {
    render(<Header />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("should open dropdown menu on avatar click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const avatarTrigger = screen.getByRole("button", { name: "JD" });
    await user.click(avatarTrigger);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@test.com")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Log out")).toBeInTheDocument();
    });
  });

  it("should call logout when logout clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const avatarTrigger = screen.getByRole("button", { name: "JD" });
    await user.click(avatarTrigger);

    await waitFor(() => {
      expect(screen.getByText("Log out")).toBeInTheDocument();
    });
    await user.click(screen.getByText("Log out"));

    expect(mockLogout).toHaveBeenCalled();
  });
});
