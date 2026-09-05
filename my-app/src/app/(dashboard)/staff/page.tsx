// frontend/src/app/(dashboard)/staff/page.tsx
"use client";

import { useState } from "react";
import { useStaff } from "@/hooks/useStaff";
import { StaffList } from "@/components/staff/StaffList";
import { InviteStaffForm } from "@/components/staff/InviteStaffForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function StaffPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    staff,
    isLoading,
    inviteStaff,
    isInviting,
    updateRole,
    isUpdatingRole,
    removeStaff,
    isRemoving,
    reactivateStaff,
    isReactivating,
  } = useStaff();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        Loading staff...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={(props) => (
              <Button {...props}>
                <Plus className="mr-2 h-4 w-4" />
                Invite Staff
              </Button>
            )}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Staff Member</DialogTitle>
            </DialogHeader>
            <InviteStaffForm
              onSubmit={(data) => {
                inviteStaff(data);
                setIsDialogOpen(false);
              }}
              isLoading={isInviting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <StaffList
        staff={staff}
        onUpdateRole={updateRole}
        onRemove={removeStaff}
        onReactivate={reactivateStaff}
        isUpdating={isUpdatingRole}
        isRemoving={isRemoving}
        isReactivating={isReactivating}
      />
    </div>
  );
}
