import { Container, styled } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import NavbarDrawerHeader from "../Navbar/NavbarDrawerHeader/NavbarDrawerHeader";

const StyledMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
}));

/**
 * Use this component to wrap all the page if the page contains the Navbar component
 * This allow use to transition and see the content when the drawer is opened
 * @returns React component
 */
const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <NavbarDrawerHeader />
      <StyledMain>{children}</StyledMain>
    </Container>
  );
};

export default Main;
