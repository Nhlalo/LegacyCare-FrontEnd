"use client";

import { useState } from "react";
import { Staff } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserX, UserCheck } from "lucide-react";
import { format } from "date-fns";

const roleColors = {
  OWNER: "bg-purple-100 text-purple-800",
  MANAGER: "bg-blue-100 text-blue-800",
  STAFF: "bg-green-100 text-green-800",
  LIMITED: "bg-gray-100 text-gray-800",
};

interface StaffListProps {
  staff: Staff[];
  onUpdateRole: ({ staffId, role }: { staffId: string; role: string }) => void;
  onRemove: (staffId: string) => void;
  onReactivate: (staffId: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
  isReactivating: boolean;
}

export function StaffList({
  staff,
  onUpdateRole,
  onRemove,
  onReactivate,
  isUpdating,
  isRemoving,
  isReactivating,
}: StaffListProps) {
  const [includeInactive, setIncludeInactive] = useState(false);

  const filteredStaff = includeInactive ? staff : staff.filter((s) => s.active);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Staff Members</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeInactive}
            onChange={(e) => setIncludeInactive(e.target.checked)}
          />
          Show inactive
        </label>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.user.firstName} {member.user.lastName}
                </TableCell>
                <TableCell>{member.user.email}</TableCell>
                <TableCell>
                  <Badge className={roleColors[member.role]}>
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {member.active ? (
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(member.invitedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={({ ...props }) => (
                        <Button variant="ghost" size="icon" {...props}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      )}
                    />
                    <DropdownMenuContent align="end">
                      {member.role !== "OWNER" && (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateRole({
                                staffId: member.id,
                                role: "MANAGER",
                              })
                            }
                            disabled={isUpdating}
                          >
                            Set as Manager
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateRole({
                                staffId: member.id,
                                role: "STAFF",
                              })
                            }
                            disabled={isUpdating}
                          >
                            Set as Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateRole({
                                staffId: member.id,
                                role: "LIMITED",
                              })
                            }
                            disabled={isUpdating}
                          >
                            Set as Limited
                          </DropdownMenuItem>
                        </>
                      )}
                      {member.active ? (
                        <DropdownMenuItem
                          onClick={() => onRemove(member.id)}
                          disabled={isRemoving}
                          className="text-red-600"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => onReactivate(member.id)}
                          disabled={isReactivating}
                          className="text-green-600"
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Reactivate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
