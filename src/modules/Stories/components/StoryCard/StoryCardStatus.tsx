import { Chip } from "@mui/material";
import { FC } from "react";

interface IStoryCardStatusProps {
  totalChapters: number;
}

/**
 * Show a chip with the status of the story if has a new chapter or is a new story
 * @returns React component
 */
const StoryCardStatus: FC<IStoryCardStatusProps> = ({ totalChapters }) => {
  const isNewStory = totalChapters <= 1;
  const statusLabel = isNewStory ? "Nueva historia" : "Nuevo capítulo";

  return (
    <Chip
      label={statusLabel}
      sx={[
        {
          position: "absolute",
          zIndex: 1000,
          right: 4,
          bottom: 8,
          height: 20,
          letterSpacing: 0.5,
          fontWeight: "bold",
        },
        isNewStory
          ? {
              backgroundColor: "primary.light",
              color: "primary.contrastText",
            }
          : {
              backgroundColor: "secondary.light",
              color: "secondary.contrastText",
            },
      ]}
    />
  );
};
export default StoryCardStatus;
