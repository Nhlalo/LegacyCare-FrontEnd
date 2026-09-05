"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { ResetPasswordSuccess } from "@/components/auth/ResetPasswordSuccess";
import { ResetPasswordInvalidLink } from "@/components/auth/ResetPasswordInvalidLink";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (data: { password: string }) => {
    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(token, data.password);
      setIsSuccess(true);
      toast.success("Password reset successfully!");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      toast.error("Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return <ResetPasswordInvalidLink />;
  }

  if (isSuccess) {
    return <ResetPasswordSuccess />;
  }

  return <ResetPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
