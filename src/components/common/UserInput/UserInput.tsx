import { S } from './UserInput.style.ts';

interface UserInputProps {
  height?: string;
  width: string;
  color?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

const UserInput = ({
  height,
  width,
  color,
  placeholder,
  value,
  onChange,
}: UserInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.UserInput
      height={height}
      width={width}
      color={color}
      placeholder={placeholder}
      onChange={handleInputChange}
      value={value}
    />
  );
};

export default UserInput;
