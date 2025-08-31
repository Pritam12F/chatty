import { prisma } from "@workspace/db";
import { deleteRoomSchema } from "@workspace/types";
import { Router } from "express";

export const deleteRoomRouter: Router = Router();

deleteRoomRouter.post("/", async (req, res) => {
  const { success, data } = deleteRoomSchema.safeParse(req.body);

  if (!success) {
    res.status(405).json({
      error: "Invalid inputs",
    });

    return;
  }

  try {
    await prisma.room.delete({
      where: {
        id: data.roomId,
      },
    });

    res.json({ message: "Room was deleted successfully!" });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: e instanceof Error ? e.message : "Internal server error occured",
    });
  }
});
