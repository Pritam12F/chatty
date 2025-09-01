"use client";

import { TextGenerateEffect } from "@workspace/ui/components/text-generate-effect";

const words = `Your AI study buddy for every YouTube video.`;

export function TextGenerate() {
  return <TextGenerateEffect duration={2} filter={false} words={words} />;
}
