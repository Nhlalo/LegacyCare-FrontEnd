import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { funeralHomeService } from "../services/funeralHome.service";
import { toast } from "sonner";

export const funeralHomeKeys = {
  all: ["funeralHome"] as const,
  details: () => [...funeralHomeKeys.all, "details"] as const,
};

export function useFuneralHome() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: funeralHomeKeys.details(),
    queryFn: () => funeralHomeService.getFuneralHome(),
    enabled: false, // Don't auto-fetch, only when needed
  });

  const createFuneralHome = useMutation({
    mutationFn: (name: string) => funeralHomeService.createFuneralHome(name),
    onSuccess: (data) => {
      queryClient.setQueryData(funeralHomeKeys.details(), data);
      toast.success("Funeral home created successfully");
    },
    onError: (error: any) => {
      toast.error("Failed to create funeral home");
    },
  });

  return {
    funeralHome: data,
    isLoading,
    error,
    createFuneralHome: createFuneralHome.mutateAsync,
    isCreating: createFuneralHome.isPending,
  };
}
