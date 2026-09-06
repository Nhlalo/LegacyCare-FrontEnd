"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CreateFuneralHomeForm } from "@/components/funeral-home/CreateFuneralHomeForm";
import { useFuneralHome } from "../../../../hooks/useFuneralHome";
import { toast } from "sonner";

export default function SetupFuneralHomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { createFuneralHome, isCreating } = useFuneralHome();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (data: { name: string }) => {
    setIsSubmitting(true);
    try {
      await createFuneralHome(data.name);
      toast.success("Funeral home created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Failed to create funeral home");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <CreateFuneralHomeForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting || isCreating}
      />
    </div>
  );
}
