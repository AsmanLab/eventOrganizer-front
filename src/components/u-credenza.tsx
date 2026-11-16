import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "./ui/button";

const UDialog = ({
  title = "Title",
  children,
  triggerElement,
}: {
  title: string;
  children: React.ReactNode;
  triggerElement: React.ReactNode;
}) => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>{triggerElement}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>{children}</CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button>Закрыть</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default UDialog;
