import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import Link from "../../Link/Link";

interface INavbarDrawerItem {
  label: string;
  pathname: string;
  Icon?: ReactElement;
}

interface INavbarDrawerItemsProps {
  open: boolean;
  items: INavbarDrawerItem[];
  handleCloseDrawer: () => void;
}

const NavbarDrawerItems: FC<INavbarDrawerItemsProps> = ({ open, items }) => {
  const router = useRouter();

  return (
    <List>
      {items.map(({ label, pathname, Icon }, index) => (
        <ListItem
          key={`navbar-list-${index}-${label}`}
          disablePadding
          sx={{
            display: "block",
            ...(pathname === router.pathname && {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            }),
          }}
          component={Link}
          href={pathname}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "primary.main",
                ...(pathname === router.pathname && {
                  color: "primary.contrastText",
                }),
              }}
            >
              {Icon}
            </ListItemIcon>
            <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default NavbarDrawerItems;
