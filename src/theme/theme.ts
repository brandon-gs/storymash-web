import { createTheme } from "@mui/material/styles";

/**
 * {@link  https://www.color-hex.com/color-palette/64495|palete}
 */

const theme = createTheme({
  palette: {
    primary: {
      // main: "#584FB2",
      main: "#30336b",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0984e3",
      // main: "#4f6eb2",
      // main: "#b24f77",
      contrastText: "#FFFFFF",
    },
    success: {
      // main: "#76c893",
      main: "#4fb258",
      contrastText: "#FFFFFF",
    },
    black: {
      dark: "#20252e",
      main: "#2f3542",
      light: "#57606f",
    },
    pink: {
      light: "#f586e6",
      main: "#f368e0",
      dark: "#aa489c",
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

declare module "@mui/material/styles" {
  export interface Palette {
    black: Palette["primary"];
    pink: Palette["primary"];
  }

  export interface PaletteOptions {
    black: PaletteOptions["primary"];
    pink: PaletteOptions["primary"];
  }
}

export default theme;
