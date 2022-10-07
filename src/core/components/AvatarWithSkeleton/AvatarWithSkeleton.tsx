import { Avatar, AvatarProps, Skeleton } from "@mui/material";
import { FC } from "react";

interface AvatarWithSkeletonProps extends AvatarProps {
  isLoading: boolean;
}

const AvatarWithSkeleton: FC<AvatarWithSkeletonProps> = ({
  isLoading,
  ...avatarProps
}) => {
  if (isLoading) {
    return (
      <Skeleton variant="circular">
        <Avatar sx={avatarProps.sx} />
      </Skeleton>
    );
  }

  return <Avatar {...avatarProps} />;
};
export default AvatarWithSkeleton;
