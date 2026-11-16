import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authSignOut } from "api/auth/fetchers";
import { authStore } from "store/auth";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  const signOutMutation = useMutation({
    mutationFn: authSignOut,
    onSuccess(data) {
      authStore.getState().logout();
      router.push("/login");
      toast.success("Вы успешно вышли из системы");
    },
    onError(error: any) {
      toast.error(error?.response?.data?.detail || "Ошибка выхода из системы");
    },
  });

  return {
    onSignOut: () => signOutMutation.mutate(),
    isLoading: signOutMutation.isPending,
  };
}
