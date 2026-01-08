import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type DialogType = 'login' | 'register' | 'forgotPw';

type DropdownDialogContextProps = {
  dialogType?: DialogType | undefined;
  setDialogType: (type: DialogType | undefined) => void;
};

const initialState = {
  dialogType: undefined,
  setDialogType: () => null,
};

export const DropdownDialogContext =
  createContext<DropdownDialogContextProps>(initialState);

export const DropdownDialogProvider = ({
  children,
  initialValue,
}: PropsWithChildren & { initialValue: DialogType | undefined }) => {
  const [valState, setValState] = useState(initialValue);

  const value = {
    dialogType: valState,
    setDialogType: (type: DialogType | undefined) => setValState(type),
  };

  return (
    <DropdownDialogContext.Provider value={value}>
      {children}
    </DropdownDialogContext.Provider>
  );
};

export const useDropdownDialogContext = () => {
  const context = useContext(DropdownDialogContext);
  if (!context) throw new Error('No dropdown dialog context available');

  return context;
};
