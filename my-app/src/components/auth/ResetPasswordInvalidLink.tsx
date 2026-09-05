"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function ResetPasswordInvalidLink() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Invalid Link</CardTitle>
          <CardDescription>
            This password reset link is invalid or expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button render={<Link href="/forgot-password" />} className="w-full">
            Request New Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
