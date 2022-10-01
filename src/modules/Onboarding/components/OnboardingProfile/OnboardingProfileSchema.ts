import { TypeOf, z } from "zod";

const MAX_FILE_SIZE = 500000;
// const MAX_FILE_SIZE = 0;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const onboardingProfileSchema = z.object({
  about: z
    .string()
    .min(10, "Debe tener al menos 10 caracteres")
    .max(1000, "Debe tener máximo 1000 caracteres")
    .or(z.literal("")),
  image: z
    .any()
    .refine((files) => files?.length == 1, "La imágen es requerida")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `El tamaño máximo de la imagen es 5MB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo los formatos .jpg, .jpeg, .png y .webp son aceptados"
    )
    .or(z.any().optional()),
});

export type IOnboardingProfileSchema = TypeOf<typeof onboardingProfileSchema>;
