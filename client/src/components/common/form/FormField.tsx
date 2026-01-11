import { Label } from '../../ui/label';
import { InputErrorWrapper } from '../inputs/InputErrorWrapper';

export const FormField = ({
  id,
  label,
  errorMessage,
  children,
  labelClassname,
  errorClassname,
}: {
  id: string;
  label: string;
  errorMessage?: string;
  children: React.ReactNode;
  labelClassname?: string;
  errorClassname?: string;
}) => (
  <InputErrorWrapper
    errorMessage={errorMessage}
    errorClassname={errorClassname}
  >
    <div className="space-y-2">
      <Label htmlFor={id} className={labelClassname}>
        {label}
      </Label>
      {children}
    </div>
  </InputErrorWrapper>
);
