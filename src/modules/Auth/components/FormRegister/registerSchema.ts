import { literal, object, string, TypeOf } from "zod";

const registerSchema = object({
  username: string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(10, "El nombre de usuario debe tener al menos 10 caracteres")
    .regex(
      new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,10}$/gi),
      "Nombre de usuario no válido"
    ),
  email: string()
    .min(1, "El correo electrónico es requerido")
    .email("Correo electrónico inválido."),
  password: string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña debe tener máximo 32 caracteres"),
  passwordConfirm: string().min(1, "Por favor, confirma tu contraseña"),
  terms: literal(true, {
    errorMap: () => ({
      message: "Debes aceptar los términos y condiciones",
    }),
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Las contraseñas no coinciden",
});

export type TRegisterSchema = TypeOf<typeof registerSchema>;

export default registerSchema;
