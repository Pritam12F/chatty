import { Router } from "express";
import { prisma } from "@workspace/db";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { openAIClient } from "../../lib/open-ai";
import { addRoomSchema } from "@workspace/types";

async function getVideoTitle(videoUrl: string) {
  const info = await ytdl.getInfo(videoUrl);
  return {
    id: info.videoDetails.videoId,
    title: info.videoDetails.title,
    url: info.videoDetails.video_url,
    duration: info.videoDetails.lengthSeconds,
    description: info.videoDetails.description,
    thumbnail: info.videoDetails.thumbnail.thumbnails.find((t) => t.url)?.url,
  };
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

export const addRoomRouter: Router = Router();

addRoomRouter.post("/", async (req, res) => {
  const { success, data } = addRoomSchema.safeParse(req.body);

  if (!success) {
    res.status(405).json({
      error: "Invalid inputs",
    });

    return;
  }

  const {
    title,
    url,
    id: videoId,
    description,
    duration,
    thumbnail,
  } = await getVideoTitle(data.videoUrl);
  const videoPath = videoId.concat(".mp4");
  const audioPath = videoId.concat(".mp3");
  const userId = req.headers["userId"] as string;

  try {
    await downloadVideo(data.videoUrl, videoPath);
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

    const t = await prisma.$transaction(async (tx) => {
      const room = await tx.room.create({
        data: {
          name: title,
          transcribedText: transcribedText.text,
          userId,
        },
      });

      await tx.video.create({
        data: {
          title,
          url,
          description,
          videoId,
          roomId: room.id,
          duration: new Date(parseInt(duration) * 1000),
          thumbnail,
        },
      });

      return room.id;
    });

    res.json({
      message: "Video successfully transcribed!",
      roomId: t,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      error: e instanceof Error ? e.message : "Internal server error occured",
    });
  }
});
