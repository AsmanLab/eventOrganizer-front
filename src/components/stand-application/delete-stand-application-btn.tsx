import { Button } from "../ui/button";
import ConfirmDialog from "../confirm-dialog";
import { useDeleteStandApplication } from "api/stands/queries";

const DeleteStandApplicationBtn = ({
  children,
  standAppId,
}: {
  children: React.ReactNode;
  standAppId: number;
}) => {
  const { mutate: deleteStandApplication, isPending } =
    useDeleteStandApplication();

  const handleDelete = () => {
    deleteStandApplication(standAppId);
  };

  return (
    <ConfirmDialog
      title="Удалить заявку?"
      description="Это действие невозможно отменить. Вы уверены, что хотите продолжить?"
      confirmText="Удалить"
      cancelText="Отмена"
      onConfirm={() => handleDelete()}
      triggerElement={
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-main-red"
          disabled={isPending}
        >
          {children}
        </Button>
      }
    />
  );
};

export default DeleteStandApplicationBtn;
