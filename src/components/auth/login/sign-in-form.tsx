"use client";

import { BaseForm } from "@/components/forms/BaseForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignInForm } from "./use-sign-in";
import { BRAND } from "shared/brand";

const SignInForm = () => {
  const { form, onSubmit, isLoading } = useSignInForm();

  return (
    <BaseForm
      form={form}
      onSubmit={onSubmit}
      className="w-full max-w-[260px] flex flex-col space-y-6"
    >
      <h1 className="text-center text-xl font-semibold text-admin-primary">
        {BRAND.adminTitle} <span className="text-main-red">{BRAND.adminSuffix}</span>
      </h1>
      {/* Имя пользователя */}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                id="username"
                placeholder="Имя пользователя"
                autoComplete="username"
                className="h-11 text-admin-primary focus-visible:ring-main-blue border-admin-primary placeholder:text-admin-primary/40"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Пароль */}
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                id="password"
                placeholder="Пароль"
                autoComplete="password"
                type="password"
                className="h-11 text-admin-primary focus-visible:ring-main-blue border-admin-primary placeholder:text-admin-primary/40"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        disabled={isLoading}
        size={"lg"}
        type="submit"
        className="h-11 w-full bg-admin-primary hover:bg-admin-primary/85"
      >
        Войти
      </Button>
    </BaseForm>
  );
};

export default SignInForm;
