import { Container, styled } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "@/core/hooks";
import { DRAWER_WIDTH } from "@/core/utils";
import { selectDrawer } from "@/core/store";
import NavbarDrawerHeader from "../Navbar/NavbarDrawerHeader/NavbarDrawerHeader";

const StyledMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${DRAWER_WIDTH}px`,
  }),
}));

/**
 * Use this component to wrap all the page if the page contains the Navbar component
 * This allow use to transition and see the content when the drawer is opened
 * @returns React component
 */
const Main: FC<PropsWithChildren> = ({ children }) => {
  const drawer = useAppSelector(selectDrawer);

  return (
    <Container maxWidth="lg">
      <NavbarDrawerHeader />
      <StyledMain open={drawer.open}>{children}</StyledMain>
    </Container>
  );
};

export default Main;
