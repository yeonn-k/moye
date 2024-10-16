import { S } from './OwnerAvatar.style';

interface DefaultAvatarProps {
  width?: string;
  height?: string;
  $avatarUrl?: string | null;
}

const OwnerAvatar = ({
  width = '180px',
  height = '180px',
  $avatarUrl = null,
}: DefaultAvatarProps) => {
  return (
    <S.AvatarBox>
      <S.Avatar
        to={`/owner`}
        width={width}
        height={height}
        $avatarUrl={$avatarUrl}
      />
    </S.AvatarBox>
  );
};

export default OwnerAvatar;
