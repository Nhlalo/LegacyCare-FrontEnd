import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IStaffService, staffService } from "../services/staff.service";
import { toast } from "sonner";

export const staffKeys = {
  all: ["staff"] as const,
  lists: () => [...staffKeys.all, "list"] as const,
  list: (includeInactive?: boolean) =>
    [...staffKeys.lists(), { includeInactive }] as const,
};

export function useStaff(
  service: IStaffService = staffService,
  includeInactive: boolean = false,
) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: staffKeys.list(includeInactive),
    queryFn: () => service.getStaff(includeInactive),
  });

  const inviteStaff = useMutation({
    mutationFn: service.inviteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success("Staff invited successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to invite staff");
    },
  });

  const updateRole = useMutation({
    mutationFn: ({ staffId, role }: { staffId: string; role: string }) =>
      service.updateRole(staffId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success("Role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update role");
    },
  });

  const removeStaff = useMutation({
    mutationFn: service.removeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success("Staff removed successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to remove staff");
    },
  });

  const reactivateStaff = useMutation({
    mutationFn: service.reactivateStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.lists() });
      toast.success("Staff reactivated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to reactivate staff");
    },
  });

  return {
    staff: data || [],
    isLoading,
    error,
    inviteStaff: inviteStaff.mutate,
    isInviting: inviteStaff.isPending,
    updateRole: updateRole.mutate,
    isUpdatingRole: updateRole.isPending,
    removeStaff: removeStaff.mutate,
    isRemoving: removeStaff.isPending,
    reactivateStaff: reactivateStaff.mutate,
    isReactivating: reactivateStaff.isPending,
  };
}
