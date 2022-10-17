import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment, type TextFieldProps } from "@mui/material";
import dynamic from "next/dynamic";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useFormInput from "./useFormInput";

const TextField = dynamic(() => import("@mui/material/TextField"));

type IFormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    showPassword,
    handleMouseDownPassword,
    handleClickShowPassword,
    getTextFieldType,
  } = useFormInput();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          InputProps={{
            endAdornment: otherProps.type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...otherProps}
          {...field}
          type={getTextFieldType(otherProps.type)}
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as string) : ""}
        />
      )}
    />
  );
};

export default FormInput;
