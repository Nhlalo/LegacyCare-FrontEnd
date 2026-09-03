import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { User } from "../types";

export const authKeys = {
  user: ["user"] as const,
};

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: authKeys.user,
    queryFn: async () => {
      const stored = localStorage.getItem("user");
      return stored ? (JSON.parse(stored) as User) : null;
    },
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      queryClient.setQueryData(authKeys.user, user);
      router.push("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      queryClient.setQueryData(authKeys.user, user);
      router.push("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      queryClient.setQueryData(authKeys.user, null);
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isLoading: isLoadingUser,
    isAuthenticated: !!user && !!localStorage.getItem("accessToken"),
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
