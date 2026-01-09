import { Label } from '../../ui/label';
import { InputErrorWrapper } from '../inputs/InputErrorWrapper';

export const FormField = ({
  id,
  label,
  errorMessage,
  children,
}: {
  id: string;
  label: string;
  errorMessage?: string;
  children: React.ReactNode;
}) => (
  <InputErrorWrapper errorMessage={errorMessage}>
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  </InputErrorWrapper>
);