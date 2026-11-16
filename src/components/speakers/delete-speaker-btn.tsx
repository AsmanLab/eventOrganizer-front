import { useDeleteSpeaker } from "api/speaker/queries";
import { Button } from "../ui/button";
import ConfirmDialog from "../confirm-dialog";

const DeleteSpeakerBtn = ({
  children,
  speakerId,
}: {
  children: React.ReactNode;
  speakerId: string;
}) => {
  const { mutate: deleteSpeaker, isPending } = useDeleteSpeaker();

  const handleDeleteFestival = () => {
    deleteSpeaker(speakerId);
  };

  return (
    <ConfirmDialog
      title="Удалить спикера?"
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

export default DeleteSpeakerBtn;
