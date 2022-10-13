import { useGetUserQuery } from "@/core/services";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { FC } from "react";

interface StoryLikeProps {
  authorId: string;
  chapterLikes: string[];
}

const StoryLike: FC<StoryLikeProps> = ({ authorId, chapterLikes }) => {
  const { data: user, ...userQuery } = useGetUserQuery();

  if (!user || userQuery.isLoading) {
    return <Favorite onClick={() => alert("should remove like")} />;
  }

  const isAuthor = authorId === user._id;
  const prevLiked = chapterLikes.includes(user._id);

  if (isAuthor) {
    return (
      <Favorite
        sx={(theme) => ({
          color: theme.palette.black.main,
        })}
      />
    );
  }

  if (!prevLiked) {
    return (
      <FavoriteBorderOutlined
        onClick={() => alert("I should add a like")}
        sx={(theme) => ({
          cursor: "pointer",
          color: theme.palette.pink.light,
        })}
      />
    );
  }

  return (
    <Favorite
      onClick={() => alert("should remove like")}
      sx={(theme) => ({
        cursor: "pointer",
        color: theme.palette.pink.light,
      })}
    />
  );
};
export default StoryLike;
