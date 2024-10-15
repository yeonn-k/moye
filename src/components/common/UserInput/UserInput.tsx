import { S } from './UserInput';
import useInputValue from '../../../hooks/useInputValue';

interface UserInputProps {
  height?: string;
  width: string;
  color?: string;
  placeholder: string;
}

const UserInput = ({ height, width, color, placeholder }: UserInputProps) => {
  const [inputValue, handleInputChange] = useInputValue();

  return (
    <S.UserInput
      height={height}
      width={width}
      color={color}
      placeholder={placeholder}
      onChange={(e) => {
        handleInputChange(e.target.value);
      }}
    />
  );
};

export default UserInput;
