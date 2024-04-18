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
    })
    .max(64, {
      message: "Email must be at most 64 characters",
    }),
  projectName: z
    .string()
    .min(1, {
      message: "Please enter a project name",
    })
    .max(64, {
      message: "Project name must be at most 64 characters",
    }),
  projectStreetAddress: z
    .string()
    .min(1, {
      message: "Please enter a project street address",
    })
    .max(64, {
      message: "Street address must be at most 64 characters",
    }),
  projectCity: z
    .string()
    .min(1, {
      message: "Please enter a project city",
    })
    .max(64, {
      message: "City must be at most 64 characters",
    }),
  projectPostcode: z
    .string()
    .min(1, {
      message: "Please enter a project postcode",
    })
    .regex(new RegExp(/^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/), {
      message: "Please enter a valid UK postcode",
    }),
  projectDescription: z.string(),
  desiredOHP: z
    .string()
    .regex(new RegExp(/^(?:100|[1-9][0-9]?|0)$/), {
      message: "Desired OHP must be a number between 0 and 100",
    })
    .min(1, {
      message: "Please enter a desired OHP",
    })
    .max(3, {
      message: "Desired OHP must be at most 3 digits",
    }),
  contractorsCustomPreliminaries: z.string(),
  files: z.array(z.any()),
});
