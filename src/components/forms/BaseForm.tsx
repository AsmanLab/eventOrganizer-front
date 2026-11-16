"use client";

import { UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Form } from "../ui/form";

type BaseFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
};

export function BaseForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: BaseFormProps<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </Form>
  );
}
