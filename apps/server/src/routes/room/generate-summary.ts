import { openAIClient } from "../../lib/open-ai";
import {
  generateSummaryPrompt,
  summaryUserPrompt,
} from "../../constants/prompts";
import { Router } from "express";
import { generateSummarySchema } from "@workspace/types";
import { prisma } from "@workspace/db";

function generateSummary(transcribedText: string) {
  const generatedSummary = openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: generateSummaryPrompt(transcribedText),
      },
      {
        role: "user",
        content: summaryUserPrompt,
      },
    ],
  });

  return generatedSummary;
}

export const generateSummaryRouter: Router = Router();

generateSummaryRouter.post("/", async (req, res) => {
  const { success, data } = generateSummarySchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      message: "No room ID provided",
    });

    return;
  }

  try {
    const room = await prisma.room.findFirst({
      where: { id: data?.roomId },
    });

    if (room?.summary) {
      res.json({
        message: room.summary,
      });

      return;
    }

    const generatedSummary = await generateSummary(room?.transcribedText!);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    let finalSummary = "";

    for await (const chunk of generatedSummary) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        finalSummary += content;
        res.write(`data: ${content}\n\n`);
      }
    }

    await prisma.room.update({
      where: {
        id: data.roomId,
      },
      data: {
        summary: finalSummary,
      },
    });

    res.write("event: end\ndata: [DONE]\n\n");
    res.end();
  } catch (e) {
    console.error(e);

    res.write("event: error\ndata: Internal server error\n\n");
    res.end();
  }
});
