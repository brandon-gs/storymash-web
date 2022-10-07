import { PhotoCamera } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type FormInputFileButtonProps<T extends FieldValues> = UseControllerProps<T>;

const FormInputFileButton = <T extends FieldValues>({
  control,
  name,
}: FormInputFileButtonProps<T>) => {
  const { field } = useController({ name, control });

  return (
    <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
      <input
        defaultValue={undefined}
        hidden
        accept="image/*"
        type="file"
        onChange={(e) => {
          field.onChange(e.target.files);
        }}
      />
      <Typography>Cambiar foto</Typography>
    </Button>
  );
};

export default FormInputFileButton;
