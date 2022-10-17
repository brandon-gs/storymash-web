import { FC } from "react";
import Image from "next/image";
import { Avatar, Grid, Typography } from "@mui/material";
import { StoryCardResponse } from "../../services/storiesApiTypes";
import { useBlurImage } from "@/core/hooks";

interface StoryCardAuthorProps {
  author: StoryCardResponse["author"];
}

const StoryCardAuthor: FC<StoryCardAuthorProps> = ({ author }) => {
  const { blurUrl, originalUrl } = useBlurImage(author.imageUrl, {
    width: 40,
  });

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
        <Avatar aria-label="Usuario creador de la historia" color="inherit">
          <Image
            src={originalUrl}
            alt={`Avatar de ${author.username}`}
            placeholder="blur"
            blurDataURL={blurUrl}
            layout="fill"
          />
        </Avatar>
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
