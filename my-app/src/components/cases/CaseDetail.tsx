"use client";

import { Case } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, MapPin, DollarSign, Link2, Mail } from "lucide-react";

const statusColors = {
  OPEN: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  READY: "bg-blue-100 text-blue-800",
  CLOSED: "bg-gray-100 text-gray-800",
};

interface CaseDetailProps {
  caseData: Case;
  onGenerateLink?: (caseId: string) => void;
  onSendLink?: (caseId: string, email: string) => void;
  onClose?: (caseId: string) => void;
  isGenerating?: boolean;
  isSending?: boolean;
  isClosing?: boolean;
}

export function CaseDetail({
  caseData,
  onGenerateLink,
  onSendLink,
  onClose,
  isGenerating,
  isSending,
  isClosing,
}: CaseDetailProps) {
  const handleSendLink = () => {
    const email = prompt("Enter family email address:");
    if (email && onSendLink) {
      onSendLink(caseData.id, email);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{caseData.familyName} Family</h1>
          <p className="text-gray-600">
            {caseData.deceasedName || "No deceased name"}
          </p>
        </div>
        <Badge className={statusColors[caseData.status]}>
          {caseData.status}
        </Badge>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{caseData.type}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">${caseData.totalAmount}</div>
            <p className="text-sm text-gray-600">
              Paid: ${caseData.paidAmount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {format(new Date(caseData.createdAt), "MMM d, yyyy")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Details */}
      {(caseData.serviceDate || caseData.serviceLocation) && (
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {caseData.serviceDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{format(new Date(caseData.serviceDate), "PPP")}</span>
              </div>
            )}
            {caseData.serviceLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{caseData.serviceLocation}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Manage this case</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {caseData.status !== "CLOSED" && (
            <>
              <Button
                variant="outline"
                onClick={() => onGenerateLink?.(caseData.id)}
                disabled={isGenerating}
              >
                <Link2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Family Link"}
              </Button>

              <Button
                variant="outline"
                onClick={handleSendLink}
                disabled={isSending}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isSending ? "Sending..." : "Send Link to Family"}
              </Button>

              <Button
                variant="destructive"
                onClick={() => onClose?.(caseData.id)}
                disabled={isClosing}
              >
                {isClosing ? "Closing..." : "Close Case"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
