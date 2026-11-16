import ConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteMediaFile } from "api/media/queries";
import { Trash } from "lucide-react";

const DeleteMediaFileBtn = ({ id }: { id: number }) => {
  const { mutateAsync: deleteMediaFile, isPending } = useDeleteMediaFile();

  const handleDelete = () => {
    deleteMediaFile(id);
  };

  return (
    <ConfirmDialog
      title="Удалить?"
      description="Это действие невозможно отменить. Вы уверены, что хотите продолжить?"
      confirmText="Удалить"
      cancelText="Отмена"
      onConfirm={() => handleDelete()}
      triggerElement={
        <Button
          variant="ghost"
          className="absolute top-2 right-2 bg-white hover:bg-red-100 hover:text-red-700 hover:scale-150 transition-transform hover:rounded-full w-7 h-7 flex items-center justify-center"
          disabled={isPending}
        >
          <Trash size={20} />
        </Button>
      }
    />
  );
};

export default DeleteMediaFileBtn;
