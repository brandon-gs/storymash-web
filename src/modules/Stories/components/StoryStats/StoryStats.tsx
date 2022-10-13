import { Stack, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface StoryStatsProps extends PropsWithChildren {
  value: number;
}

const StoryStats: FC<StoryStatsProps> = ({ children, value }) => {
  return (
    <Stack alignItems={"center"}>
      {children}
      <Typography variant="body2" component="p">
        {value}
      </Typography>
    </Stack>
  );
};

export default StoryStats;
