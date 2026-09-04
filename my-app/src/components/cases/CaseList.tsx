// frontend/src/components/cases/CaseList.tsx
import { Case } from "@/types";
import { CaseCard } from "./CaseCard";

interface CaseListProps {
  cases: Case[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function CaseList({
  cases,
  isLoading,
  emptyMessage = "No cases found",
}: CaseListProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="mt-2 text-sm text-gray-600">Loading cases...</p>
        </div>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cases.map((caseData) => (
        <CaseCard key={caseData.id} caseData={caseData} />
      ))}
    </div>
  );
}
