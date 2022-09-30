import { z, type TypeOf } from "zod";

const minDate = new Date();
minDate.setFullYear(new Date().getFullYear() - 100);

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);

export const onboardingInfoFormSchema = z.object({
  firstname: z
    .string({
      required_error: "Este campo es requerido",
    })
    .min(3, "Este campo debe tener al menos 3 caracteres"),
  lastname: z
    .string({
      required_error: "Este campo debe tener al menos 3 caracteres",
    })
    .min(3, "Este campo debe tener al menos 3 caracteres"),
  birthdate: z
    .date({
      errorMap: (issue) => {
        const date = `${minDate.getDate()}/${
          minDate.getMonth() + 1
        }/${minDate.getFullYear()}`;
        if (issue.code === "too_small") {
          return {
            message: `La fecha debe ser mayor o igual a ${date}`,
          };
        }
        if (issue.code === "too_big") {
          return {
            message: `La fecha debe ser menor o igual a ${date}`,
          };
        }
        return {
          message: "Fecha no válida",
        };
      },
    })
    .min(minDate)
    .max(maxDate),
});

export type IOnboardingInfoFormSchema = TypeOf<typeof onboardingInfoFormSchema>;
