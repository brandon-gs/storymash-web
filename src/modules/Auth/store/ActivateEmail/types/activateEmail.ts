import { TRegisterSchema } from "@/modules/Auth/components";

export interface IActivateEmailState {
  email?: string;
  formErrors: Record<IRegisterErrorFields, string | undefined>;
}

export interface ISetEmailToActiveAction {
  email: string;
}

export type IRegisterErrorFields = keyof Pick<
  TRegisterSchema,
  "email" | "username"
>;
