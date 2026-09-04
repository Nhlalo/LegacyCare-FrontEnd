import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Case } from "@/types";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  caseData: Case;
  className?: string;
}

export const statusColors: Record<string, string> = {
  OPEN: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  READY: "bg-blue-100 text-blue-800",
  CLOSED: "bg-gray-100 text-gray-800",
};

export function CaseCard({ caseData, className }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseData.id}`}>
      <Card
        className={cn(
          "cursor-pointer transition-colors hover:bg-gray-50",
          className,
        )}
      >
        <CardHeader>
          <CardTitle>{caseData.familyName}</CardTitle>
          <CardDescription>
            {caseData.deceasedName || "No deceased name"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge className={statusColors[caseData.status] || "bg-gray-100"}>
              {caseData.status}
            </Badge>
            <span className="text-sm text-gray-600">
              ${caseData.totalAmount}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Paid: ${caseData.paidAmount}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
