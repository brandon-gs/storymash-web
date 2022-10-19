import { Link, TimeAgo } from "@/core/components";
import { useBlurImage } from "@/core/hooks";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC, memo } from "react";
import { StoryCardResponse } from "../../services/storiesApiTypes";
import StoryCardAuthor from "./StoryCardAuthor";
import StoryCardFooter from "./StoryCardFooter";
import StoryCardStatus from "./StoryCardStatus";

interface StoryCardProps {
  story: StoryCardResponse;
  index?: number;
}

const StoryCard: FC<StoryCardProps> = ({ story, index = 0 }) => {
  const backgroundCover = `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.9))`;

  const { blurUrl, originalUrl } = useBlurImage(story.imageUrl, {
    width: 568,
  });

  return (
    <Card sx={{ width: 284, overflow: "hidden", position: "relative" }}>
      <CardActionArea
        sx={{ position: "relative" }}
        component={Link}
        href={`/stories/read/${story._id}`}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 168,
          }}
        >
          <Box
            style={{
              position: "relative",
              zIndex: 10,
              background: backgroundCover,
              height: "100%",
              width: "100%",
            }}
          />
          <Image
            src={originalUrl}
            alt={story.title}
            layout="fill"
            placeholder={"blur"}
            blurDataURL={blurUrl}
            {...(index ?? 0 < 5 ? { loading: "eager" } : {})}
          />
          <StoryCardStatus totalChapters={story.totalChapters} />
          <StoryCardAuthor author={story.author} />
        </Box>
        <CardContent sx={{ pb: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            fontWeight="bold"
            fontSize={"1.2rem"}
          >
            {story.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="p"
            fontSize="1rem"
          >
            {story.firstChapter.content}
          </Typography>
          {story.categories.map((category) => (
            <Chip
              key={`${story._id}-chip-category-${category}`}
              label={`# ${category}`}
              color="primary"
              size="small"
              sx={(theme) => ({
                margin: theme.spacing(1, 1, 0, 0),
                fontWeight: "bold",
                fontSize: "0.8rem",
              })}
            />
          ))}
          <Stack direction="row" justifyContent={"flex-end"} mt={1}>
            <TimeAgo date={story.lastChapter} />
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <StoryCardFooter
          storyId={story._id}
          chapterId={story.firstChapter._id}
          authorId={story.author._id}
          storyIndex={index}
          chapterLikes={story.firstChapter.likes}
          totalComments={story.totalComments}
          totalLikes={story.totalLikes}
          views={story.views}
        />
      </CardActions>
    </Card>
  );
};

export default memo(StoryCard, (prev, next) => {
  return JSON.stringify(prev) === JSON.stringify(next);
});
