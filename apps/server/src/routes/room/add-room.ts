import { Router } from "express";
import { prisma } from "@workspace/db";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { openAIClient } from "../../lib/open-ai";
import {
  cardUserPrompt,
  chapterUserPrompt,
  generateCardsPrompt,
  generateChaptersPrompt,
  generateSummaryPrompt,
  summaryUserPrompt,
} from "@workspace/db/constants/prompts";
import { CardType, ChapterType } from "@workspace/types";

export const addRoomRouter: Router = Router();

async function getVideoTitle(videoUrl: string) {
  const info = await ytdl.getInfo(videoUrl);
  return {
    title: info.videoDetails.title,
    url: info.videoDetails.video_url,
  };
}

async function generateSummary(transcribedText: string): Promise<string> {
  const generatedSummary = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
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

  return generatedSummary.choices[0]?.message.content!;
}

async function generateChapters(transcribedText: string, newRoomId: string) {
  const generatedChaptersRaw = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
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

  const generatedChapters: ChapterType[] = JSON.parse(
    generatedChaptersRaw.choices[0]?.message.content!
  );

  await Promise.all(
    generatedChapters.map(async (chapter) => {
      return await prisma.chapter.create({
        data: {
          roomId: newRoomId,
          ...chapter,
        },
      });
    })
  );
}

async function generateCards(transcribedText: string, newRoomId: string) {
  const generatedCardsRaw = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
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

  const generatedCards: CardType[] = JSON.parse(
    generatedCardsRaw.choices[0]?.message.content!
  );

  await Promise.all(
    generatedCards.map(async (card) => {
      return await prisma.card.create({
        data: {
          roomId: newRoomId,
          ...card,
        },
      });
    })
  );
}

addRoomRouter.post("/", async (req, res) => {
  const { videoUrl } = req.body;
  const videoId = videoUrl.split("=")[1] as string;
  const videoPath = videoId.concat(".mp4");
  const audioPath = videoId.concat(".mp3");
  const userId = req.headers["userId"] as string;

  try {
    const video = ytdl(videoUrl, {
      filter: (format) => format.container === "mp4",
      quality: 18,
    }).pipe(fs.createWriteStream(videoPath));

    video.on("error", (e) => {
      console.error(e);

      res
        .json({
          erro: "Error occured when downloading video",
        })
        .status(403);

      return;
    });

    video.on("finish", async () => {
      ffmpeg(videoPath)
        .toFormat("mp3")
        .save(audioPath)
        .on("end", async () => {
          console.log("Conversion finished!");

          const transcribedText =
            await openAIClient.audio.transcriptions.create({
              file: fs.createReadStream(audioPath),
              model: "whisper-1",
            });

          fs.unlink(videoPath, () => {
            console.log("video cleaned up");
          });

          fs.unlink(audioPath, () => {
            console.log("audio cleaned up");
          });

          const { title, url } = await getVideoTitle(videoUrl);

          const summary = await generateSummary(transcribedText.text);

          const newRoom = await prisma.room.create({
            data: {
              name: title,
              video: url,
              transcribedText: transcribedText.text,
              summary,
              userId,
            },
          });

          await generateChapters(transcribedText.text, newRoom.id);
          await generateCards(transcribedText.text, newRoom.id);

          res.json({
            message: "Video was successfully transcribed!",
          });

          return;
        })
        .on("error", (err) => {
          console.error("Error converting:", err);

          res
            .json({
              error: "Error transcribing video",
            })
            .status(402);

          return;
        });
    });
  } catch {
    res
      .json({
        error: "Internal server error occured",
      })
      .status(500);
  }
});
