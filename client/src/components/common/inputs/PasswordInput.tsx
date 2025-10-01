import { useState, type ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const PasswordInput = ({
  ...props
}: Omit<ComponentProps<'input'>, 'type'>) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="flex items-center">
      <Input type={hidden ? 'password' : 'text'} {...props} />
      <FontAwesomeIcon
        className="absolute left-[88%] cursor-pointer"
        icon={hidden ? faEye : faEyeSlash}
        onClick={() => setHidden(!hidden)}
        size={'lg'}
      ></FontAwesomeIcon>
    </div>
  );
};
