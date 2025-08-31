import { CardType, generateCardschema } from "@workspace/types";
import { cardUserPrompt, generateCardsPrompt } from "../../constants/prompts";
import { openAIClient } from "../../lib/open-ai";
import { Router } from "express";
import { prisma } from "@workspace/db";

function generateCards(transcribedText: string, newRoomId: string) {
  const generatedCardsRaw = openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: generateCardsPrompt(transcribedText),
      },
      {
        role: "user",
        content: cardUserPrompt,
      },
    ],
  });

  return generatedCardsRaw;
}

export const generateCardsRouter: Router = Router();

generateCardsRouter.post("/", async (req, res) => {
  const { success, data } = generateCardschema.safeParse(req.body);

  if (!success) {
    res.status(402).json({
      message: "Invalid inputs",
    });

    return;
  }

  try {
    const roomExists = await prisma.room.findFirst({
      where: {
        id: data.roomId,
      },
      include: {
        cards: true,
      },
    });

    if (!roomExists) {
      res.status(403).json({
        message: "Room doesn't exist",
      });

      return;
    }

    const cardsExist = await prisma.card.findMany({
      where: {
        id: roomExists.id,
      },
    });

    if (cardsExist.length > 0) {
      res.json({
        message: "Cards fetched",
        cards: cardsExist,
      });

      return;
    }

    const generatedCards = await generateCards(
      roomExists.transcribedText,
      roomExists.id
    );

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    let finalCards = "";

    for await (const chunk of generatedCards) {
      const content = chunk.choices[0]?.delta.content;

      if (content) {
        finalCards += content;
        res.write(`data: ${content}\n\n`);
      }
    }

    const parsedCards: CardType[] = JSON.parse(finalCards);

    await Promise.all(
      parsedCards.map(async (card) => {
        return await prisma.card.create({
          data: {
            roomId: data.roomId,
            ...card,
          },
        });
      })
    );

    res.write("event: end\ndata: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error(err);

    res.write("event: error\ndata: Internal server error\n\n");
    res.end();
  }
});
