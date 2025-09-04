import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, "Email is required"),
    password: z.string().min(5, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(5, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
