import { Link } from "@/core/components";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { StoryCardResponse } from "../../services/storiesApiTypes";
import StoryCardAuthor from "./StoryCardAuthor";
import StoryCardFooter from "./StoryCardFooter";

interface StoryCardProps {
  story: StoryCardResponse;
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const storyCover = `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.9)),url("${story.imageUrl}")`;

  return (
    <Card sx={{ maxWidth: 320 }}>
      <CardActionArea
        sx={{ position: "relative" }}
        component={Link}
        href={`/stories/read/${story._id}`}
      >
        <Box
          sx={{
            width: "100%",
            height: 124,
            background: storyCover,
            backgroundSize: "cover",
          }}
        />
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
