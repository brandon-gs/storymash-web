import { DRAWER_WIDTH } from "@/core/utils";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Favorite,
  Home,
  TrendingUp,
  Whatshot,
} from "@mui/icons-material";
import { IconButton, useTheme, Divider, Drawer } from "@mui/material";
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
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
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
