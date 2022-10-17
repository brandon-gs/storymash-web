import Image from "next/image";
import { useBlurImage } from "@/core/hooks";
import { useGetUserQuery } from "@/core/services";
import { Avatar } from "@mui/material";
import AvatarWithSkeleton from "../AvatarWithSkeleton/AvatarWithSkeleton";
import { FC } from "react";

interface IAvatarUserProps {
  width?: number;
}

const AvatarUser: FC<IAvatarUserProps> = ({ width = 40 }) => {
  const { data: user, ...userQuery } = useGetUserQuery();

  const { blurUrl, originalUrl } = useBlurImage(user?.profile?.imageUrl, {
    width,
  });

  if (!user || userQuery.isLoading) {
    return <AvatarWithSkeleton isLoading={userQuery.isLoading} />;
  }

  return (
    <Avatar sx={{ width, height: width }}>
      <Image
        src={originalUrl}
        alt={`Avatar de ${user.account.username}`}
        placeholder="blur"
        blurDataURL={blurUrl}
        layout="fill"
      />
    </Avatar>
  );
};
export default AvatarUser;
