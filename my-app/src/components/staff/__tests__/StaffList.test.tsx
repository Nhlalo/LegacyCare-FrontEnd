import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StaffList } from "../StaffList";

vi.mock("date-fns", () => ({
  format: vi.fn(() => "Jan 1, 2024"),
}));

const mockStaff = [
  {
    id: "1",
    userId: "u1",
    role: "OWNER" as const,
    active: true,
    user: {
      id: "u1",
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      isEmailVerified: true,
      createdAt: "2024-01-01",
    },
    invitedAt: "2024-01-01T00:00:00Z",
    acceptedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    userId: "u2",
    role: "STAFF" as const,
    active: true,
    user: {
      id: "u2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@test.com",
      isEmailVerified: true,
      createdAt: "2024-01-02",
    },
    invitedAt: "2024-01-02T00:00:00Z",
    acceptedAt: "2024-01-02T00:00:00Z",
  },
];

describe("StaffList", () => {
  const mockUpdateRole = vi.fn();
  const mockRemove = vi.fn();
  const mockReactivate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render staff list", () => {
    render(
      <StaffList
        staff={mockStaff}
        onUpdateRole={mockUpdateRole}
        onRemove={mockRemove}
        onReactivate={mockReactivate}
        isUpdating={false}
        isRemoving={false}
        isReactivating={false}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("jane@test.com")).toBeInTheDocument();
  });

  it("should filter inactive staff", async () => {
    const user = userEvent.setup();
    const inactiveStaff = [
      ...mockStaff,
      {
        id: "3",
        userId: "u3",
        role: "STAFF" as const,
        active: false,
        user: {
          id: "u3",
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@test.com",
          isEmailVerified: true,
          createdAt: "2024-01-03",
        },
        invitedAt: "2024-01-03T00:00:00Z",
        acceptedAt: null,
      },
    ];

    render(
      <StaffList
        staff={inactiveStaff}
        onUpdateRole={mockUpdateRole}
        onRemove={mockRemove}
        onReactivate={mockReactivate}
        isUpdating={false}
        isRemoving={false}
        isReactivating={false}
      />,
    );

    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox", { name: /show inactive/i });
    await user.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });
  });
});
