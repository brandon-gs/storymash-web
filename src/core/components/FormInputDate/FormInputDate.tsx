import { useRef, type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DatePicker,
  LocalizationProvider,
  type MobileDatePickerProps,
} from "@mui/x-date-pickers";
import { TextField, buttonBaseClasses } from "@mui/material";
import { es } from "date-fns/locale";

type IFormInputDateProps = {
  name: string;
} & Partial<Omit<MobileDatePickerProps<any, any>, "onChange">>;

const FormInputDate: FC<IFormInputDateProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const maxDate = useRef(new Date().setFullYear(new Date().getFullYear() - 18));
  const minDate = useRef(
    new Date().setFullYear(new Date().getFullYear() - 100)
  );

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field }) => (
        <LocalizationProvider
          adapterLocale={es}
          dateAdapter={AdapterDateFns}
          localeText={{
            cancelButtonLabel: "Cancelar",
            okButtonLabel: "Seleccionar",
          }}
        >
          <DatePicker
            {...otherProps}
            {...field}
            openTo="year"
            views={["year", "month", "day"]}
            minDate={minDate.current}
            maxDate={maxDate.current}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "día/mes/año",
                }}
                error={!!errors[name]}
                helperText={
                  errors[name] ? (errors[name]?.message as string) : ""
                }
              />
            )}
            DialogProps={{
              PaperProps: {
                sx: {
                  pb: 1,
                  [`& .${buttonBaseClasses.root}`]: {
                    mt: 2,
                    lineHeight: "1.5rem",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
export default FormInputDate;
