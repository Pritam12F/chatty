import { Router } from "express";
import { signUpSchema } from "@workspace/types";
import { prisma } from "@workspace/db";

export const signUpRouter: Router = Router();

signUpRouter.post("/", async (req, res) => {
  const { success, data } = signUpSchema.safeParse(req.body);

  if (!success) {
    res
      .json({
        message: "Invalid inputs for signup process",
      })
      .status(402);

    return;
  }

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      res
        .json({
          message: "User already signedup",
        })
        .status(403);

      return;
    }

    await prisma.user.create({ data });

    res.json({
      message: "User signed up successfully",
    });
  } catch (e) {
    console.error(e);

    res.json({ message: "Internal server error occured" }).status(500);
  }
});
