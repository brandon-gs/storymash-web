import { createTheme } from "@mui/material/styles";

/**
 * {@link  https://www.color-hex.com/color-palette/64495|palete}
 */

const theme = createTheme({
  palette: {
    primary: {
      main: "#7E8BFF",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#f5f6fa",
    },
  },
});

export default theme;
