import { arkhip } from "app/fonts";
import { cn } from "../lib/utils";

const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        arkhip.className,
        "text-4xl sm:text-5xl md:text-6xl",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
