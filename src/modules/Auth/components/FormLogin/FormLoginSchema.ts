import { object, string, TypeOf } from "zod";

export const loginSchema = object({
  username: string(),
  password: string(),
});

export type ILoginSchema = TypeOf<typeof loginSchema>;
