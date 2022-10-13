import { Avatar, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { StoryCardResponse } from "../../services/storiesApiTypes";

interface StoryCardAuthorProps {
  author: StoryCardResponse["author"];
}

const StoryCardAuthor: FC<StoryCardAuthorProps> = ({ author }) => {
  return (
    <Grid
      container
      columnGap={1}
      sx={(theme) => ({
        position: "absolute",
        top: 96,
        padding: theme.spacing(0, 2),
      })}
    >
      <Grid item>
        <Avatar
          alt="Creador de la historia"
          aria-label="Usuario creador de la historia"
          color="inherit"
          src={author.imageUrl}
        />
      </Grid>
      <Grid
        item
        sx={{
          height: 40,
        }}
      >
        <Typography
          component="span"
          color="white"
          fontWeight={"bold"}
          sx={{ letterSpacing: 2, fontSize: "1rem" }}
        >
          {author.username}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default StoryCardAuthor;
