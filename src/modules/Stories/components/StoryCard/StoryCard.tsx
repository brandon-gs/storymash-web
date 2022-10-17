import { Link } from "@/core/components";
import { useBlurImage } from "@/core/hooks";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { StoryCardResponse } from "../../services/storiesApiTypes";
import StoryCardAuthor from "./StoryCardAuthor";
import StoryCardFooter from "./StoryCardFooter";

interface StoryCardProps {
  story: StoryCardResponse;
  index?: number;
}

const StoryCard: FC<StoryCardProps> = ({ story, index }) => {
  const storyCover = `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.9))`;

  const { blurUrl, originalUrl } = useBlurImage(story.imageUrl, {
    width: 568,
  });

  return (
    <Card sx={{ minWidth: 284, maxWidth: 300, overflow: "hidden" }}>
      <CardActionArea
        sx={{ position: "relative" }}
        component={Link}
        href={`/stories/read/${story._id}`}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 124,
            background: storyCover,
          }}
        >
          <Image
            src={originalUrl}
            alt={story.title}
            layout="fill"
            placeholder={"blur"}
            blurDataURL={blurUrl}
            {...(index ?? 0 < 5 ? { loading: "eager" } : {})}
          />
        </Box>
        <StoryCardAuthor author={story.author} />
        <CardContent>
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <StoryCardFooter
          authorId={story.author._id}
          chapterLikes={story.firstChapter.likes}
          totalComments={story.totalComments}
          totalLikes={story.totalLikes}
          views={story.views}
        />
      </CardActions>
    </Card>
  );
};

export default StoryCard;
