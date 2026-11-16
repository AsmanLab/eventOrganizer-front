import { useDeleteFestival } from "api/festivals/queries";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import ConfirmDialog from "../confirm-dialog";

const DeleteFestivalButton = ({ id }: { id: string }) => {
  const { mutate: deleteFestival, isPending } = useDeleteFestival();
  const router = useRouter();

  const handleDeleteFestival = () => {
    deleteFestival(id);
    router.push("/dashboard/festivals");
  };

  return (
    <ConfirmDialog
      title="Удалить мероприятие?"
      description="Это действие невозможно отменить. Вы уверены, что хотите продолжить?"
      confirmText="Удалить"
      cancelText="Отмена"
      onConfirm={() => handleDeleteFestival()}
      triggerElement={
        <Button size={"lg"} variant="destructive" disabled={isPending}>
          <Trash size={24} />
          {isPending ? "Удаление..." : "Удалить"}
        </Button>
      }
    />
  );
};

export default DeleteFestivalButton;
