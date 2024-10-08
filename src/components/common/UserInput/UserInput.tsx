import { S } from './UserInput';

interface UserInputProps {
  height?: string;
  width: string;
  placeholder: string;
}

const UserInput = ({ height, width, placeholder }: UserInputProps) => {
  return (
    <S.UserInput height={height} width={width} placeholder={placeholder} />
  );
};

export default UserInput;
