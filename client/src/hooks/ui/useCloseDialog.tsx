import { DialogClose } from '@radix-ui/react-dialog';
import { useRef } from 'react';

export const useCloseDialog = () => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const closeHidden = <DialogClose className="hidden" ref={closeRef} />;

  return { closeRef, closeHidden };
};
