import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "@/test/test-utils";

import { useStaff } from "../useStaff";
import { IStaffService } from "@/services/staff.service";

describe("useStaff", () => {
  let mockService: IStaffService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockService = {
      getStaff: vi.fn(),
      inviteStaff: vi.fn(),
      updateRole: vi.fn(),
      removeStaff: vi.fn(),
      reactivateStaff: vi.fn(),
    };
  });

  it("should fetch staff list", async () => {
    const mockStaff = [
      { id: "1", userId: "u1", role: "OWNER", active: true },
      { id: "2", userId: "u2", role: "STAFF", active: true },
    ];

    (mockService.getStaff as any).mockResolvedValue(mockStaff);

    const { result } = renderHook(() => useStaff(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.staff).toEqual(mockStaff);
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockService.getStaff).toHaveBeenCalledWith(false);
  });

  it("should include inactive staff when requested", async () => {
    (mockService.getStaff as any).mockResolvedValue([]);

    renderHook(() => useStaff(mockService, true), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockService.getStaff).toHaveBeenCalledWith(true);
    });
  });

  it("should call inviteStaff mutation", async () => {
    const mockStaff = { id: "3", userId: "u3", role: "STAFF", active: true };
    (mockService.inviteStaff as any).mockResolvedValue(mockStaff);

    const { result } = renderHook(() => useStaff(mockService), {
      wrapper: createWrapper(),
    });

    result.current.inviteStaff({ email: "test@test.com", role: "STAFF" });

    await waitFor(() => {
      expect(mockService.inviteStaff).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@test.com",
          role: "STAFF",
        }),
        expect.any(Object), // Match the mutation options
      );
    });
  });
});
