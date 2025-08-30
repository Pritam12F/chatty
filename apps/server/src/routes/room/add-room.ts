import { Router } from "express";
import { prisma } from "@workspace/db";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { openAIClient } from "../../lib/open-ai";

export const addRoomRouter: Router = Router();

async function getVideoTitle(videoUrl: string) {
  const info = await ytdl.getInfo(videoUrl);
  return {
    title: info.videoDetails.title,
    url: info.videoDetails.video_url,
  };
}

addRoomRouter.post("/", async (req, res) => {
  const { videoUrl } = req.body;
  const userId = req.headers["userId"] as string;

  try {
    const videoPath = videoUrl.split("=")[1] as string;
    const video = ytdl(videoUrl, {
      filter: (format) => format.container === "mp4",
      quality: 18,
    }).pipe(fs.createWriteStream(videoPath.concat(".mp4")));

    video.on("error", (e) => {
      console.log(e);
      res.json({
        message: "Error occured when donloading video",
      });
    });

    video.on("finish", async () => {
      ffmpeg(videoPath + ".mp4")
        .toFormat("mp3")
        .save(videoPath + ".mp3")
        .on("end", () => {
          console.log("Conversion finished!");
        })
        .on("error", (err) => {
          console.error("Error converting:", err);
        });

      const transcribedText = await openAIClient.audio.transcriptions.create({
        file: fs.createReadStream(videoPath + ".mp3"),
        model: "whisper-1",
      });

      const generatedSummary = await openAIClient.completions.create({
        model: "",
      });

      const { title, url } = await getVideoTitle(videoUrl);

      await prisma.room.create({
        data: {
          name: title,
          video: url,
          transcribedText: transcribedText.text,
          userId,
        },
      });

      res.json({
        message: "Video was successfully transcribed!",
      });
    });
  } catch {}
});
