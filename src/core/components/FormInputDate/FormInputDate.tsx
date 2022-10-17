import { useRef, type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { MobileDatePickerProps } from "@mui/x-date-pickers";
import { TextField, buttonBaseClasses } from "@mui/material";
import { es } from "date-fns/locale";
import dynamic from "next/dynamic";

const DatePicker = dynamic(() =>
  import("@mui/x-date-pickers/DatePicker").then((mod) => mod.DatePicker)
);
const LocalizationProvider = dynamic(() =>
  import("@mui/x-date-pickers/LocalizationProvider").then(
    (mod) => mod.LocalizationProvider
  )
);

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
          dateAdapter={AdapterDayjs}
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
