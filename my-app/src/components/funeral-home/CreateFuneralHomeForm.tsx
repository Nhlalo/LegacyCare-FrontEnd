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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const createFuneralHomeSchema = z.object({
  name: z.string().min(1, "Business name is required"),
});

type CreateFuneralHomeFormData = z.infer<typeof createFuneralHomeSchema>;

interface CreateFuneralHomeFormProps {
  onSubmit: (data: CreateFuneralHomeFormData) => void;
  isLoading: boolean;
}

export function CreateFuneralHomeForm({
  onSubmit,
  isLoading,
}: CreateFuneralHomeFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFuneralHomeFormData>({
    resolver: zodResolver(createFuneralHomeSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Set Up Your Funeral Home</CardTitle>
        <CardDescription>
          Enter your business name to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="funeral-home-name">
                    Business Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="funeral-home-name"
                    placeholder="Sunset Memorial Funerals"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Funeral Home"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
