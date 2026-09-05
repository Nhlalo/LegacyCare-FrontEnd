interface CaseDetailErrorProps {
  message?: string;
}

export function CaseDetailError({
  message = "Failed to load case. Please try again.",
}: CaseDetailErrorProps) {
  return (
    <div className="p-6">
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {message}
      </div>
    </div>
  );
}
