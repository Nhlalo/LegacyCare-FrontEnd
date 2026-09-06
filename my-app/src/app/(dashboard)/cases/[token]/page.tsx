"use client";

import { useParams } from "next/navigation";
import { useCases } from "@/hooks/useCases";
import { FamilyCaseView } from "@/components/family/FamilyCaseView";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function FamilyPortalPage() {
  const params = useParams();
  const token = params.token as string;

  const { useFamilyCase } = useCases();
  const { data, isLoading, error } = useFamilyCase(token);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold text-red-600">
              Invalid or Expired Link
            </h2>
            <p className="mt-2 text-gray-600">
              The link you're trying to access is invalid or has expired. Please
              contact the funeral home for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <FamilyCaseView caseData={data} />;
}
