import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export interface ICirularLoaderProps {
  height?: number;
}

const CircularLoader: FC<ICirularLoaderProps> = ({ height }) => {
  return (
    <Box
      display="grid"
      width="100%"
      height={height ?? "100%"}
      sx={{ placeContent: "center" }}
    >
      <CircularProgress color="primary" size={124} />
    </Box>
  );
};
export default CircularLoader;
