import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";

const eventLayoutSchema = z.object({
  width: z.number().min(10, "Минимум 10").max(1200, "Максимум 1200"),
  height: z.number().min(10, "Минимум 10").max(1000, "Максимум 1000"),
});

export type TEventLayoutFormData = z.infer<typeof eventLayoutSchema>;

export interface Props {
  festivalId: string;
  onSubmit: (data: TEventLayoutFormData) => Promise<void>;
  handleCloseModal: () => void;
}

export function useEventLayoutForm({
  festivalId,
  onSubmit,
  handleCloseModal,
}: Props) {
  const router = useRouter();
  const form = useForm<TEventLayoutFormData>({
    resolver: zodResolver(eventLayoutSchema),
    defaultValues: {
      width: 500,
      height: 500,
    },
  });
  const { setError, reset } = form;

  const handleFormSubmit = async (values: TEventLayoutFormData) => {
    try {
      await onSubmit(values);
      reset();
      handleCloseModal();
      router.push(`/dashboard/event-layouts/${festivalId}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        const backendErrors = error.response?.data;
        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setError(field as keyof TEventLayoutFormData, {
              message: messages.join(", "),
            });
          }
        });
      }
    }
  };

  return { form, handleFormSubmit };
}
