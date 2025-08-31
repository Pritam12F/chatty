import { prisma } from "@workspace/db";
import { openAIClient } from "../../lib/open-ai";
import {
  generateChaptersPrompt,
  chapterUserPrompt,
} from "../../constants/prompts";
import { ChapterType, generateChaptersSchema } from "@workspace/types";
import { Router } from "express";

function generateChapters(transcribedText: string, newRoomId: string) {
  const generatedChaptersRaw = openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: generateChaptersPrompt(transcribedText),
      },
      {
        role: "user",
        content: chapterUserPrompt,
      },
    ],
  });

  return generatedChaptersRaw;
}

export const generateChaptersRouter: Router = Router();

generateChaptersRouter.post("/", async (req, res) => {
  const { success, data } = generateChaptersSchema.safeParse(req.body);

  if (!success) {
    res.status(405).json({
      message: "Invalid input",
    });
  }

  try {
    const chapterExists = await prisma.chapter.findMany({
      where: {
        roomId: data?.roomId,
      },
    });

    if (chapterExists.length > 0) {
      res.json({
        message: "Chapters already exist",
        chapters: chapterExists,
      });
    }

    const room = await prisma.room.findFirst({
      where: {
        id: data?.roomId,
      },
    });

    if (!room) {
      res.status(411).json({
        message: "Room doesn't exist",
      });

      return;
    }

    const generatedChapters = await generateChapters(
      room?.transcribedText,
      room?.id
    );

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    let finalChapters = "";

    for await (const chunk of generatedChapters) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        finalChapters += content;
        res.write(`data: ${content}\n\n`);
      }
    }

    const parsedChapters: ChapterType[] = JSON.parse(finalChapters);

    await Promise.all(
      parsedChapters.map(async (ch) => {
        return await prisma.chapter.create({
          data: {
            roomId: data?.roomId!,
            title: ch.title,
            content: ch.content,
            startTime: ch.startTime,
            endTime: ch.endTime,
          },
        });
      })
    );

    res.write("event: end\ndata: [DONE]\n\n");
    res.end();
  } catch (e) {
    console.error(e);

    res.write("event: error\ndata: Internal server error\n\n");
    res.end();
  }
});
