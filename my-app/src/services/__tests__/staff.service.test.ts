import { describe, it, expect, vi, beforeEach } from "vitest";
import { StaffService } from "../staff.service";
import { ApiClient } from "@/lib/api";

describe("StaffService", () => {
  let mockApiClient: ApiClient;
  let staffService: StaffService;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as any;

    staffService = new StaffService(mockApiClient);
  });

  it("should get staff list", async () => {
    const mockStaff = [
      { id: "1", userId: "u1", role: "OWNER", active: true },
      { id: "2", userId: "u2", role: "STAFF", active: true },
    ];

    (mockApiClient.get as any).mockResolvedValue({
      data: mockStaff,
    });

    const result = await staffService.getStaff();

    expect(mockApiClient.get).toHaveBeenCalledWith("/staff");
    expect(result).toEqual(mockStaff);
  });

  it("should get staff with inactive included", async () => {
    const mockStaff = [
      { id: "1", userId: "u1", role: "OWNER", active: true },
      { id: "2", userId: "u2", role: "STAFF", active: false },
    ];

    (mockApiClient.get as any).mockResolvedValue({
      data: mockStaff,
    });

    const result = await staffService.getStaff(true);

    expect(mockApiClient.get).toHaveBeenCalledWith(
      "/staff?includeInactive=true",
    );
    expect(result).toEqual(mockStaff);
  });

  it("should invite staff", async () => {
    const inviteData = { email: "test@test.com", role: "STAFF" };
    const mockStaff = { id: "3", userId: "u3", role: "STAFF", active: true };

    (mockApiClient.post as any).mockResolvedValue({
      data: mockStaff,
    });

    const result = await staffService.inviteStaff(inviteData);

    expect(mockApiClient.post).toHaveBeenCalledWith(
      "/staff/invite",
      inviteData,
    );
    expect(result).toEqual(mockStaff);
  });

  it("should update staff role", async () => {
    const mockStaff = { id: "1", userId: "u1", role: "MANAGER", active: true };

    (mockApiClient.put as any).mockResolvedValue({
      data: mockStaff,
    });

    const result = await staffService.updateRole("1", "MANAGER");

    expect(mockApiClient.put).toHaveBeenCalledWith("/staff/1/role", {
      role: "MANAGER",
    });
    expect(result).toEqual(mockStaff);
  });

  it("should remove staff", async () => {
    (mockApiClient.delete as any).mockResolvedValue({ success: true });

    await staffService.removeStaff("1");

    expect(mockApiClient.delete).toHaveBeenCalledWith("/staff/1");
  });

  it("should reactivate staff", async () => {
    const mockStaff = { id: "1", userId: "u1", role: "STAFF", active: true };

    (mockApiClient.post as any).mockResolvedValue({
      data: mockStaff,
    });

    const result = await staffService.reactivateStaff("1");

    expect(mockApiClient.post).toHaveBeenCalledWith("/staff/1/reactivate");
    expect(result).toEqual(mockStaff);
  });
});
