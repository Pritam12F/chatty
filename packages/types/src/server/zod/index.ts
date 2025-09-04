import z from "zod";

export const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Not a valid email" }).nonempty(),
  accountType: z.enum(["CREDENTIALS", "GOOGLE", "GITHUB"]),
  password: z.string(),
});

export const addRoomSchema = z.object({
  videoUrl: z.string().nonempty(),
});

export const generateSummarySchema = z.object({
  roomId: z.string().nonempty(),
});

export const generateChaptersSchema = z.object({
  roomId: z.string().nonempty(),
});

export const generateCardschema = z.object({
  roomId: z.string().nonempty(),
});

export const deleteRoomSchema = z.object({
  roomId: z.string().nonempty(),
});
