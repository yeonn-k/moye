import { S } from './UserInput';
import useInputValue from '../../../hooks/useInputValue';

interface UserInputProps {
  height?: string;
  width: string;
  placeholder: string;
}

const UserInput = ({ height, width, placeholder }: UserInputProps) => {
  const [inputValue, handleInputChange] = useInputValue();

  return (
    <S.UserInput
      height={height}
      width={width}
      placeholder={placeholder}
      onChange={(e) => {
        handleInputChange(e.target.value);
      }}
    />
  );
};

export default UserInput;
