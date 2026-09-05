"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inviteSchema = z.object({
  email: z.string().email("Invalid email"),
  role: z.enum(["OWNER", "MANAGER", "STAFF", "LIMITED"]),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteStaffFormProps {
  onSubmit: (data: InviteFormData) => void;
  isLoading: boolean;
}

export function InviteStaffForm({ onSubmit, isLoading }: InviteStaffFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "STAFF",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="invite-staff-email">Email</FieldLabel>
              <Input
                {...field}
                id="invite-staff-email"
                type="email"
                placeholder="staff@funeralhome.com"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="invite-staff-role">Role</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="invite-staff-role"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNER">Owner</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                  <SelectItem value="LIMITED">Limited</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending invitation..." : "Send Invitation"}
        </Button>
      </FieldGroup>
    </form>
  );
}
