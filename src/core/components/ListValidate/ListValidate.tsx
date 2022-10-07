import { Stack, StackProps } from "@mui/material";
import { FC } from "react";
import Validate from "./Validate/Validate";

export interface IListValidateProps extends StackProps {}

const ListValidate: FC<IListValidateProps> = ({ ...props }) => {
  return (
    <Stack spacing={1} {...props}>
      <Validate label="La contraseña debe tener 8 caracteres" />
      <Validate label="La contraseña debe tener al menos una mayuscula caracteres" />
    </Stack>
  );
};
export default ListValidate;
