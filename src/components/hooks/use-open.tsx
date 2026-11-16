import { useState } from "react";

export function useOpen(value: boolean) {
  const [open, setOpen] = useState(value);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleToggle = (prev: boolean) => setOpen(!prev);

  return { open, handleClose, handleOpen, handleToggle };
}
