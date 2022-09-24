import { createTheme } from "@mui/material/styles";

/**
 * {@link  https://www.color-hex.com/color-palette/64495|palete}
 */

const theme = createTheme({
  palette: {
    primary: {
      main: "#584FB2",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#76c893",
    },
    background: {
      default: "#f5f6fa",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 0,
        },
      },
    },
  },
});

export default theme;
