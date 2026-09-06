import { PaymentService } from "../payment.service";
import { ApiClient } from "@/lib/api";

describe("PaymentService", () => {
  let mockApiClient: ApiClient;
  let paymentService: PaymentService;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    } as any;

    paymentService = new PaymentService(mockApiClient);
  });

  it("should call GET /payments/case/:caseId", async () => {
    const mockPayments = [
      { id: "1", caseId: "case-123", amount: 1000, status: "COMPLETED" },
      { id: "2", caseId: "case-123", amount: 500, status: "PENDING" },
    ];

    (mockApiClient.get as any).mockResolvedValue({
      data: mockPayments,
    });

    const result = await paymentService.getPayments("case-123");

    expect(mockApiClient.get).toHaveBeenCalledWith("/payments/case/case-123");
    expect(result).toEqual(mockPayments);
  });

  it("should call GET /payments/case/:caseId/status", async () => {
    const mockStatus = {
      total: 1500,
      paid: 1000,
      remaining: 500,
      isFullyPaid: false,
    };

    (mockApiClient.get as any).mockResolvedValue({
      data: mockStatus,
    });

    const result = await paymentService.getPaymentStatus("case-123");

    expect(mockApiClient.get).toHaveBeenCalledWith(
      "/payments/case/case-123/status",
    );
    expect(result).toEqual(mockStatus);
  });

  it("should call POST /payments/create", async () => {
    const data = { caseId: "case-123", amount: 1000 };
    const mockResponse = {
      paymentUrl: "https://payfast.co.za/pay/123",
      transactionId: "txn-123",
    };

    (mockApiClient.post as any).mockResolvedValue({
      data: mockResponse,
    });

    const result = await paymentService.createOnlinePayment(data);

    expect(mockApiClient.post).toHaveBeenCalledWith("/payments/create", data);
    expect(result).toEqual(mockResponse);
  });

  it("should call POST /payments/manual", async () => {
    const data = {
      caseId: "case-123",
      amount: 500,
      method: "CASH",
      reference: "REF-123",
    };
    const mockPayment = {
      id: "3",
      ...data,
      status: "COMPLETED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (mockApiClient.post as any).mockResolvedValue({
      data: mockPayment,
    });

    const result = await paymentService.recordManualPayment(data);

    expect(mockApiClient.post).toHaveBeenCalledWith("/payments/manual", data);
    expect(result).toEqual(mockPayment);
  });

  it("should handle API errors gracefully", async () => {
    const data = { caseId: "case-123", amount: 1000 };
    const error = new Error("Network error");

    (mockApiClient.post as any).mockRejectedValue(error);

    await expect(paymentService.createOnlinePayment(data)).rejects.toThrow(
      "Network error",
    );
  });
});
