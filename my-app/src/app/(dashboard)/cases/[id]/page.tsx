"use client";

import { useParams } from "next/navigation";
import { useCases } from "@/hooks/useCases";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { CaseDetailSkeleton } from "@/components/cases/CaseDetailSkeleton";
import { CaseDetailError } from "@/components/cases/CaseDetailError";

export default function CaseDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    useCase,
    generateLink,
    isGeneratingLink,
    sendLink,
    isSendingLink,
    closeCase,
    isClosing,
  } = useCases();

  const { data: caseData, isLoading, error } = useCase(id);

  if (isLoading) {
    return <CaseDetailSkeleton />;
  }

  if (error || !caseData) {
    return <CaseDetailError />;
  }

  return (
    <div className="p-6">
      <CaseDetail
        caseData={caseData}
        onGenerateLink={(id) => generateLink(id)}
        onSendLink={(id, email) => sendLink({ caseId: id, email })}
        onClose={(id) => closeCase(id)}
        isGenerating={isGeneratingLink}
        isSending={isSendingLink}
        isClosing={isClosing}
      />
    </div>
  );
}
