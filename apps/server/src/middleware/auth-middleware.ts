import { prisma } from "@workspace/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(405).json({
      message: "User is not authorized",
    });

    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const validUser = await prisma.user.findFirst({
      where: {
        email: decoded.email,
      },
    });

    if (validUser) {
      next();
    }
  } catch (e) {
    console.error(e);
    res
      .json({
        message: "Invalid token",
      })
      .status(411);
  }
};
