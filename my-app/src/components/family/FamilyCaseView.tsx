"use client";

import { Case, Payment } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, MapPin, User } from "lucide-react";

interface FamilyCaseViewProps {
  caseData: Case & { payments?: Payment[] };
}

export function FamilyCaseView({ caseData }: FamilyCaseViewProps) {
  const totalPaid =
    caseData.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  const remaining = caseData.totalAmount - totalPaid;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">In Loving Memory</h1>
        <p className="text-2xl mt-2">
          {caseData.deceasedName || "Your Loved One"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>
                {caseData.serviceDate
                  ? format(new Date(caseData.serviceDate), "PPP")
                  : "Date to be confirmed"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>
                {caseData.serviceLocation || "Location to be confirmed"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <span>Family: {caseData.familyName}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>View your payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">${caseData.totalAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-xl font-bold text-green-600">${totalPaid}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Remaining</p>
              <p
                className={`text-xl font-bold ${remaining > 0 ? "text-red-600" : "text-green-600"}`}
              >
                ${remaining}
              </p>
            </div>
          </div>
          {caseData.payments && caseData.payments.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Payment History</p>
              <div className="space-y-1">
                {caseData.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex justify-between text-sm border-b py-1"
                  >
                    <span>
                      {format(new Date(payment.createdAt), "MMM d, yyyy")}
                    </span>
                    <span>${payment.amount}</span>
                    <Badge
                      variant={
                        payment.status === "COMPLETED" ? "default" : "secondary"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
