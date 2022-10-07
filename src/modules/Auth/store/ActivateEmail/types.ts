import { TRegisterSchema } from "@/modules/Auth/components";

export interface IActivateEmailState {
  email?: string;
  formErrors: Record<IRegisterErrorFields, string | undefined>;
}

export type IRegisterErrorFields = keyof Pick<
  TRegisterSchema,
  "email" | "username"
>;
