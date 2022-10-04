import * as z from "zod";

export const SchemaUserAccount = z.object({
  username: z.string(),
  email: z.string(),
});

export const SchemaUserProfile = z
  .object({
    firstname: z.string().min(3).default(""),
    lastname: z.string().min(3).default(""),
    birthdate: z.string().default(""),
    gender: z.string().min(1).default(""),
    imageUrl: z.string().default(""),
  })
  .nullable()
  .default(null);

export const SchemaUser = z.object({
  _id: z.string(),
  account: SchemaUserAccount,
  profile: SchemaUserProfile,
});

export type IUserAccount = z.infer<typeof SchemaUserAccount>;
export type IUserProfile = z.infer<typeof SchemaUserProfile>;
export type IUser = z.infer<typeof SchemaUser>;
