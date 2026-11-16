"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "./use-sign-out";
import { LogOut } from "lucide-react";
import { cn } from "@/components/lib/utils";

const SignOutButton = ({ className }: { className?: string }) => {
  const { onSignOut, isLoading } = useSignOut();

  return (
    <Button
      variant={"outline"}
      onClick={onSignOut}
      disabled={isLoading}
      className={cn("text-admin-primary hover:text-admin-primary", className)}
    >
      <LogOut />
      {"Выйти"}
    </Button>
  );
};

export default SignOutButton;
