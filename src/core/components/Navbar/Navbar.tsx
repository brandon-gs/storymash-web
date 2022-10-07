import { useAppDispatch, useAppSelector } from "@/core/hooks";
import {
  handleCloseDrawer,
  handleOpenDrawer,
  selectDrawer,
} from "@/core/store";
import NavbarAppbar from "./NavbarAppbar/NavbarAppbar";
import NavbarDrawer from "./NavbarDrawer/NavbarDrawer";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const drawer = useAppSelector(selectDrawer);

  const openDrawer = () => {
    dispatch(handleOpenDrawer());
  };

  const closeDrawer = () => {
    dispatch(handleCloseDrawer());
  };

  return (
    <>
      <NavbarAppbar open={drawer.open} handleDrawerOpen={openDrawer} />
      <NavbarDrawer open={drawer.open} handleDrawerClose={closeDrawer} />
    </>
  );
};
export default Navbar;
