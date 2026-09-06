import { ApiClient } from "@/lib/api";
import apiClient from "@/lib/api";
import { Payment, PaymentStatus } from "@/types";

export interface IPaymentService {
  getPayments(caseId: string): Promise<Payment[]>;
  getPaymentStatus(caseId: string): Promise<PaymentStatus>;
  createOnlinePayment(data: { caseId: string; amount: number }): Promise<{
    paymentUrl: string;
    transactionId: string;
  }>;
  recordManualPayment(data: {
    caseId: string;
    amount: number;
    method: string;
    reference: string;
  }): Promise<Payment>;
}

export class PaymentService implements IPaymentService {
  constructor(private apiClient: ApiClient) {}

  async getPayments(caseId: string): Promise<Payment[]> {
    const response = await this.apiClient.get<{
      success: boolean;
      data: Payment[];
    }>(`/payments/case/${caseId}`);
    return response.data;
  }

  async getPaymentStatus(caseId: string): Promise<PaymentStatus> {
    const response = await this.apiClient.get<{
      success: boolean;
      data: PaymentStatus;
    }>(`/payments/case/${caseId}/status`);
    return response.data;
  }

  async createOnlinePayment(data: {
    caseId: string;
    amount: number;
  }): Promise<{ paymentUrl: string; transactionId: string }> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: { paymentUrl: string; transactionId: string };
    }>("/payments/create", data);
    return response.data;
  }

  async recordManualPayment(data: {
    caseId: string;
    amount: number;
    method: string;
    reference: string;
  }): Promise<Payment> {
    const response = await this.apiClient.post<{
      success: boolean;
      data: Payment;
    }>("/payments/manual", data);
    return response.data;
  }
}

export const paymentService = new PaymentService(apiClient);
