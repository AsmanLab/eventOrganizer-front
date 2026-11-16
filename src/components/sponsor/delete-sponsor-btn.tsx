import { Button } from "../ui/button";
import ConfirmDialog from "../confirm-dialog";
import { useDeleteSponsor } from "api/sponsors/queries";

const DeleteSponsorBtn = ({
  children,
  sponsorId,
}: {
  children: React.ReactNode;
  sponsorId: string;
}) => {
  const { mutate: deleteSponsor, isPending } = useDeleteSponsor();

  const handleDeleteFestival = () => {
    deleteSponsor(sponsorId);
  };

  return (
    <ConfirmDialog
      title="Удалить спонсора?"
      description="Это действие невозможно отменить. Вы уверены, что хотите продолжить?"
      confirmText="Удалить"
      cancelText="Отмена"
      onConfirm={() => handleDeleteFestival()}
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

export default DeleteSponsorBtn;
