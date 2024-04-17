import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(64, {
      message: "Name must be at most 64 characters",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .min(1, {
      message: "Please enter an email address",
    }),
  projectName: z.string().min(1, {
    message: "Please enter a project name",
  }),
  projectDescription: z.string(),
  desiredOHP: z
    .number()
    .min(1, {
      message: "Please enter a desired OHP",
    })
    .max(10, {
      message: "Desired OHP must be at most 10 digits",
    }),
  contractorsCustomPreliminaries: z.string(),
  files: z.array(z.any()),
});
