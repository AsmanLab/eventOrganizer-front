import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInSchema, TSignInFormData } from "./sign-in-schema";
import { authSignIn } from "api/auth/fetchers";
import { authStore } from "store/auth";

export function useSignInForm() {
  const router = useRouter();
  const form = useForm<TSignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: "", password: "" },
  });

  const signInMutation = useMutation({
    mutationFn: authSignIn,
    onSuccess(data) {
      authStore.getState().signIn(data);
      router.push("/dashboard");
      toast.success("Вы успешно вошли в систему");
    },
    onError(error: any) {
      error as any;
      toast.error(error?.response?.data?.detail || "Ошибка входа в систему");
    },
  });

  return {
    form,
    onSubmit: signInMutation.mutate,
    isLoading: signInMutation.isPending,
  };
}
