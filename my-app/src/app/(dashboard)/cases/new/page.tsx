"use client";

import { useRouter } from "next/navigation";
import { useCases } from "@/hooks/useCases";
import { CaseForm, CaseFormData } from "@/components/cases/CaseForm";

export default function NewCasePage() {
  const router = useRouter();
  const { createAtNeed, createPreNeed, isCreatingAtNeed, isCreatingPreNeed } =
    useCases();

  const isSubmitting = isCreatingAtNeed || isCreatingPreNeed;

  const handleSubmit = async (data: CaseFormData) => {
    const payload = {
      familyName: data.familyName,
      deceasedName: data.deceasedName,
      serviceDate: data.serviceDate || undefined,
      serviceLocation: data.serviceLocation || undefined,
      totalAmount: data.totalAmount ? parseFloat(data.totalAmount) : undefined,
    };

    if (data.caseType === "AT_NEED") {
      await createAtNeed(payload);
    } else {
      await createPreNeed({
        familyName: data.familyName,
        monthlyPayment: data.totalAmount
          ? parseFloat(data.totalAmount) / 12
          : 0,
        totalAmount: data.totalAmount ? parseFloat(data.totalAmount) : 0,
      });
    }

    router.push("/cases");
  };

  const handleCancel = () => {
    router.push("/cases");
  };

  return (
    <CaseForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
    />
  );
}
