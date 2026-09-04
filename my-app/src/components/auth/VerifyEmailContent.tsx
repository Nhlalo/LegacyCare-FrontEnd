"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

type VerificationStatus = "loading" | "success" | "error";

interface VerifyEmailContentProps {
  status: VerificationStatus;
  message: string;
}

export function VerifyEmailContent({
  status,
  message,
}: VerifyEmailContentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>Verifying your email address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="text-gray-600">
                Please wait while we verify your email...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-12 w-12 text-green-600" />
              <p className="text-green-600 font-medium">{message}</p>
              <p className="text-sm text-gray-500">Redirecting to login...</p>

              <Button className="mt-2" render={<Link href="/login" />}>
                Go to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 text-red-600" />
              <p className="text-red-600">{message}</p>
              <Button className="mt-2" render={<Link href="/login" />}>
                Return to Login
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
