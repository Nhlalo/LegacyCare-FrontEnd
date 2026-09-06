import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IPaymentService, paymentService } from "../services/payment.service";
import { toast } from "sonner";

export const paymentKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentKeys.all, "list"] as const,
  list: (caseId: string) => [...paymentKeys.lists(), caseId] as const,
  status: (caseId: string) => [...paymentKeys.all, "status", caseId] as const,
};

export function usePayments(
  caseId: string,
  service: IPaymentService = paymentService,
) {
  const queryClient = useQueryClient();

  const { data: payments, isLoading: isLoadingPayments } = useQuery({
    queryKey: paymentKeys.list(caseId),
    queryFn: () => service.getPayments(caseId),
    enabled: !!caseId,
  });

  const { data: status, isLoading: isLoadingStatus } = useQuery({
    queryKey: paymentKeys.status(caseId),
    queryFn: () => service.getPaymentStatus(caseId),
    enabled: !!caseId,
  });

  const createOnlinePayment = useMutation({
    mutationFn: service.createOnlinePayment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.list(caseId) });
      queryClient.invalidateQueries({ queryKey: paymentKeys.status(caseId) });
      toast.success("Payment initiated. Redirecting to payment gateway...");
      window.location.href = data.paymentUrl;
    },
    onError: (error: any) => {
      toast.error("Failed to initiate payment");
    },
  });

  const recordManualPayment = useMutation({
    mutationFn: service.recordManualPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.list(caseId) });
      queryClient.invalidateQueries({ queryKey: paymentKeys.status(caseId) });
      toast.success("Payment recorded successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to record payment");
    },
  });

  return {
    payments: payments || [],
    status,
    isLoading: isLoadingPayments || isLoadingStatus,
    createOnlinePayment: createOnlinePayment.mutate,
    isCreatingPayment: createOnlinePayment.isPending,
    recordManualPayment: recordManualPayment.mutate,
    isRecordingPayment: recordManualPayment.isPending,
  };
}
