import {
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
  Typography,
  FormControlLabelProps,
} from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IFormCheckboxProps = {
  name: string;
  label: string;
} & Omit<FormControlLabelProps, "control">;

const FormCheckbox: FC<IFormCheckboxProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup>
      <FormControlLabel
        label={
          <Typography color={errors[name] ? "error" : "gray"} variant="body2">
            {label}
          </Typography>
        }
        control={
          <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field: { value, ...field } }) => (
              <Checkbox {...field} checked={!!value} />
            )}
          />
        }
        {...otherProps}
      />
      {!!errors[name] && (
        <FormHelperText error>{errors[name]?.message as string}</FormHelperText>
      )}
    </FormGroup>
  );
};
export default FormCheckbox;
