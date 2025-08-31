import { Router } from "express";
import { signUpSchema } from "@workspace/types";
import { prisma } from "@workspace/db";

export const signUpRouter: Router = Router();

signUpRouter.post("/", async (req, res) => {
  const { success, data } = signUpSchema.safeParse(req.body);

  if (!success) {
    res.status(402).json({
      message: "Invalid inputs for signup process",
    });

    return;
  }

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      res.status(403).json({
        message: "User already signedup",
      });

      return;
    }

    await prisma.user.create({ data });

    res.json({
      message: "User signed up successfully",
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({ message: "Internal server error occured" });
  }
});
