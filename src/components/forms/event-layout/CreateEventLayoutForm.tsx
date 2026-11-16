"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TEventLayoutFormData, useEventLayoutForm } from "./useEventLayoutForm";
import { BaseForm } from "../BaseForm";
import { useCreateEventLayout } from "api/event-layouts/queries";
import { Button } from "@/components/ui/button";

const CreateEventlayoutForm = ({
  festivalId,
  handleCloseModal,
}: {
  festivalId: string;
  handleCloseModal: () => void;
}) => {
  const createMuatation = useCreateEventLayout();

  const onSubmit = async (data: TEventLayoutFormData) => {
    await createMuatation.mutateAsync({ newEventLayout: data, festivalId });
  };

  const { form, handleFormSubmit } = useEventLayoutForm({festivalId, onSubmit, handleCloseModal });
  const { control } = form;

  return (
    <BaseForm
      form={form}
      onSubmit={handleFormSubmit}
      className="space-y-6 pt-2 pb-8 w-[370px]"
    >
      <FormField
        control={control}
        name="width"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="width">Ширина площадки</FormLabel>
            <FormControl>
              <Input
                id="width"
                type="number"
                {...field}
                className="h-11"
                onChange={(e) =>
                  field.onChange(e.target.value ? Number(e.target.value) : "")
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="height"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="height">Высота площадки</FormLabel>
            <FormControl>
              <Input
                id="height"
                type="number"
                {...field}
                className="h-11"
                onChange={(e) =>
                  field.onChange(e.target.value ? Number(e.target.value) : "")
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        size={"lg"}
        className="bg-main-blue hover:bg-main-blue/85"
        disabled={createMuatation.isPending}
      >
        Создать
      </Button>
    </BaseForm>
  );
};

export default CreateEventlayoutForm;
