import { useGetUserQuery } from "@/core/services";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { FC } from "react";
import { useLikeStoryCardMutation } from "../../services";

interface StoryLikeProps {
  storyId: string;
  chapterId: string;
  authorId: string;
  chapterLikes: string[];
  storyIndex: number;
}

const StoryLike: FC<StoryLikeProps> = ({
  storyId,
  chapterId,
  authorId,
  chapterLikes,
  storyIndex,
}) => {
  const { data: user, ...userQuery } = useGetUserQuery();

  const [likeStoryCardChapter] = useLikeStoryCardMutation();

  if (!user || userQuery.isLoading) {
    return <Favorite onClick={() => alert("should remove like")} />;
  }

  const isAuthor = authorId === user._id;
  const prevLiked = chapterLikes.includes(user._id);

  const handleLikeChapter = () => {
    likeStoryCardChapter({ storyId, chapterId, userId: user._id, storyIndex });
  };

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
        onClick={handleLikeChapter}
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
