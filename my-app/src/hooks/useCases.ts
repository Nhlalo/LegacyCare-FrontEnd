import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ICaseService, caseService } from "@/services/case.service";
import { toast } from "sonner";

const isDev = process.env.NODE_ENV === "development";

export const caseKeys = {
  all: ["cases"] as const,
  lists: () => [...caseKeys.all, "list"] as const,
  list: () => [...caseKeys.lists()] as const,
  details: () => [...caseKeys.all, "detail"] as const,
  detail: (id: string) => [...caseKeys.details(), id] as const,
};

export function useCases(service: ICaseService = caseService) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: caseKeys.list(),
    queryFn: () => service.getCases(),
  });

  const useCase = (id: string) => {
    return useQuery({
      queryKey: caseKeys.detail(id),
      queryFn: () => service.getCase(id),
      enabled: !!id,
    });
  };

  const createAtNeed = useMutation({
    mutationFn: service.createAtNeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caseKeys.list() });
      toast.success("Case created successfully");
    },
    onError: (error: any) => {
      if (isDev) {
        console.error("Create case error:", error);
      }
      toast.error("Failed to create case");
    },
  });

  const createPreNeed = useMutation({
    mutationFn: service.createPreNeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caseKeys.list() });
      toast.success("Pre-need case created successfully");
    },
    onError: (error: any) => {
      if (isDev) {
        console.error("Create pre-need case error:", error);
      }
      toast.error("Failed to create pre-need case");
    },
  });

  const updateCase = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      service.updateCase(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: caseKeys.list() });
      queryClient.invalidateQueries({ queryKey: caseKeys.detail(id) });
      toast.success("Case updated successfully");
    },
    onError: (error: any) => {
      if (isDev) {
        console.error("Update case error:", error);
      }
      toast.error("Failed to update case");
    },
  });

  const generateLink = useMutation({
    mutationFn: service.generateLink,
    onSuccess: () => toast.success("Family link generated successfully"),
    onError: (error: any) => {
      if (isDev) {
        console.error("Generate link error:", error);
      }
      toast.error("Failed to generate link");
    },
  });

  const sendLink = useMutation({
    mutationFn: ({ caseId, email }: { caseId: string; email: string }) =>
      service.sendLink(caseId, email),
    onSuccess: () => toast.success("Link sent to family successfully"),
    onError: (error: any) => {
      if (isDev) {
        console.error("Send link error:", error);
      }
      toast.error("Failed to send link");
    },
  });

  const closeCase = useMutation({
    mutationFn: service.closeCase,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: caseKeys.list() });
      queryClient.invalidateQueries({
        queryKey: caseKeys.detail(id as string),
      });
      toast.success("Case closed successfully");
    },
    onError: (error: any) => {
      if (isDev) {
        console.error("Close case error:", error);
      }
      toast.error("Failed to close case");
    },
  });

  return {
    cases: data || [],
    isLoading,
    error,
    useCase,
    createAtNeed: createAtNeed.mutate,
    isCreatingAtNeed: createAtNeed.isPending,
    createPreNeed: createPreNeed.mutate,
    isCreatingPreNeed: createPreNeed.isPending,
    updateCase: updateCase.mutate,
    isUpdating: updateCase.isPending,
    generateLink: generateLink.mutate,
    isGeneratingLink: generateLink.isPending,
    sendLink: sendLink.mutate,
    isSendingLink: sendLink.isPending,
    closeCase: closeCase.mutate,
    isClosing: closeCase.isPending,
  };
}
