import { FC } from "react";
import {
  styled,
  AppBar as MuiAppBar,
  AppBarProps,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { DRAWER_WIDTH } from "@/core/utils";

interface ISyledAppBarProps extends AppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<ISyledAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface INavbarAppbarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const NavbarAppbar: FC<INavbarAppbarProps> = ({ open, handleDrawerOpen }) => {
  return (
    <StyledAppBar
      position="fixed"
      open={open}
      sx={{ backgroundColor: "white", color: "black.main", boxShadow: 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 3,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          STORYMASH
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavbarAppbar;
