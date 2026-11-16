// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "store/auth";
import Loading from "@/components/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [hydrated, setHydrated] = useState(false);
  const user = authStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Mark component as hydrated once it's mounted on the client.
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Once hydrated, if there's no user, redirect to /login.
    if (hydrated && !user) {
      router.push("/login");
    }
  }, [hydrated, user, router]);

  // While waiting for hydration, or if redirecting, render a placeholder.
  if (!hydrated) {
    return (
      <div className="h-screen w-full">
        <Loading />
      </div>
    );
  }

  // If there's no user, we return null because the redirect is in progress.
  if (!user) {
    return null;
  }

  // If authenticated, render protected content.
  return <>{children}</>;
}
