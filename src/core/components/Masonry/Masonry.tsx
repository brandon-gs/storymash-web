import { Box, BoxProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import useMasonry from "./useMasonry";

export interface MasonryProps extends PropsWithChildren {
  breakpointsCols?: number | Record<"default" | number, number>;
  columnAttrs?: BoxProps; // object, added to the columns
  fixedColumnWidth?: number;
}

const Masonry: FC<MasonryProps> = ({ ...props }) => {
  const { renderColumns } = useMasonry(props);

  return (
    <Box
      sx={{
        display: "flex",
        width: "auto",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      {renderColumns()}
    </Box>
  );
};
export default Masonry;
