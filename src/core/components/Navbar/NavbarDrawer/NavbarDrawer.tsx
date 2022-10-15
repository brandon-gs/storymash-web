import { DRAWER_WIDTH } from "@/core/utils";
import {
  Book,
  Favorite,
  Home,
  Menu as MenuIcon,
  TrendingUp,
  Whatshot,
} from "@mui/icons-material";
import {
  IconButton,
  useTheme,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import { FC } from "react";
import DrawerHeader from "../NavbarDrawerHeader/NavbarDrawerHeader";
import NavbarDrawerItems from "./NavbarDrawerItems";

interface INavbarDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const NavbarDrawer: FC<INavbarDrawerProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        zIndex: theme.zIndex.drawer + 1000,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
        },
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <DrawerHeader sx={{ justifyContent: "flex-start", px: 3 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClose}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          STORYMASH
        </Typography>
      </DrawerHeader>

      <Divider />
      <NavbarDrawerItems
        open={open}
        items={[
          {
            label: "Inicio",
            pathname: "/stories",
            Icon: <Home />,
          },
          {
            label: "Siguiendo",
            pathname: "/stories/feed",
            Icon: <Book />,
          },
          {
            label: "Favoritos",
            pathname: "/stories/favorites",
            Icon: <Favorite />,
          },
          {
            label: "Ranking",
            pathname: "/stories/ranking",
            Icon: <TrendingUp />,
          },
          {
            label: "Tendencias",
            pathname: "/stories/trending",
            Icon: <Whatshot />,
          },
        ]}
      />
    </Drawer>
  );
};

export default NavbarDrawer;
