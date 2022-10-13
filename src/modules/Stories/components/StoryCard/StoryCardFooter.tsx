import { QuestionAnswer, Visibility } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { FC } from "react";
import StoryLike from "../StoryLike/StoryLike";
import StoryStats from "../StoryStats/StoryStats";

interface StoryCardFooterProps {
  authorId: string;
  chapterLikes: string[];
  totalLikes: number;
  totalComments: number;
  views: string[];
}

const StoryCardFooter: FC<StoryCardFooterProps> = ({
  authorId,
  chapterLikes,
  totalLikes,
  totalComments,
  views,
}) => {
  return (
    <Grid container spacing={1} justifyContent="flex-end">
      <Grid item>
        <StoryStats value={views.length}>
          <Visibility
            sx={(theme) => ({
              color: theme.palette.black.main,
            })}
          />
        </StoryStats>
      </Grid>
      <Grid item>
        <StoryStats value={totalComments}>
          <QuestionAnswer
            sx={(theme) => ({
              color: theme.palette.black.main,
            })}
          />
        </StoryStats>
      </Grid>
      <Grid item>
        <StoryStats value={totalLikes}>
          <StoryLike authorId={authorId} chapterLikes={chapterLikes} />
        </StoryStats>
      </Grid>
    </Grid>
  );
};

export default StoryCardFooter;
