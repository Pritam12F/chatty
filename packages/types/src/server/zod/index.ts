import z from "zod";

export const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Not a valid email" }).nonempty(),
  accountType: z.enum(["CREDENTIALS", "GOOGLE", "GITHUB"]),
  password: z.string().optional(),
});
