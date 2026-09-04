"use client";

import { useCases } from "@/hooks/useCases";
import { CaseList } from "./CaseList";

interface CasesContainerProps {
  className?: string;
}

export function CasesContainer({ className }: CasesContainerProps) {
  const { cases, isLoading } = useCases();

  return <CaseList cases={cases} isLoading={isLoading} className={className} />;
}
