"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { ForgotPasswordSuccess } from "@/components/auth/ForgotPasswordSuccess";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setIsSent(true);
      toast.success("Password reset link sent to your email.");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return <ForgotPasswordSuccess />;
  }

  return <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
