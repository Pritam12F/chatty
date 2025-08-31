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
} from "../../constants/prompts";
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

async function downloadVideo(videoUrl: string, videoPath: string) {
  return new Promise<void>((res, rej) => {
    ytdl(videoUrl, {
      filter: (format) => format.container === "mp4",
      quality: 18,
    })
      .pipe(fs.createWriteStream(videoPath))
      .on("error", (e) => {
        console.error(e);

        rej();
      })
      .on("finish", () => {
        console.log("Successfully downloaded video");
        res();
      });
  });
}

async function convertToMP3(videoPath: string, audioPath: string) {
  return new Promise<void>((res, rej) => {
    ffmpeg(videoPath)
      .toFormat("mp3")
      .save(audioPath)
      .on("end", () => {
        console.log("Successfully convert to audio");
        res();
      })
      .on("error", (e) => {
        console.error(e);
        rej();
      });
  });
}

addRoomRouter.post("/", async (req, res) => {
  const { videoUrl } = req.body;
  const videoId = videoUrl.split("=")[1] as string;
  const videoPath = videoId.concat(".mp4");
  const audioPath = videoId.concat(".mp3");
  const userId = req.headers["userId"] as string;

  try {
    await downloadVideo(videoUrl, videoPath);
    await convertToMP3(videoPath, audioPath);

    const transcribedText = await openAIClient.audio.transcriptions.create({
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
      message: "Video successfully transcribed!",
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      error: "Internal server error occured",
    });
  }
});
