import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "./lib/utils";

// UDialog with internal state management
const UDialog = ({
  title = "Title",
  children,
  triggerElement,
  className,
}: {
  title: string;
  children: React.ReactNode;
  triggerElement: React.ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent
        className={cn("max-w-max overflow-scroll no-scrollbar", className)}
      >
        <DialogHeader>
          <DialogTitle className="text-start">{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

// UDialog with external state management
const UDialogControlled = ({
  title = "Title",
  children,
  triggerElement,
  isOpen,
  onOpenChange,
}: {
  title: string;
  children: React.ReactNode;
  triggerElement: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="max-w-max">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-scroll no-scrollbar">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export { UDialog, UDialogControlled };
