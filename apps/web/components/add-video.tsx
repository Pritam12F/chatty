"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Link, Search, Youtube } from "lucide-react";
import { useCallback, useState } from "react";

export default function AddVideo() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyzeVideo = useCallback(() => {}, [youtubeUrl]);

  return (
    <Card className="mb-12 bg-gradient-to-r from-blue-800/5 via-primary/5 to-black/20 border-blue-700/20 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 border bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Youtube className="w-6 h-6 text-red-500/90" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Analyze YouTube Video
            </h2>
            <p className="text-muted-foreground">
              Paste any YouTube URL to get instant summaries, chapters, and
              start chatting
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="pl-10 h-12 text-base bg-background/50 border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-gray-400"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyzeVideo()}
            />
          </div>
          <Button
            onClick={handleAnalyzeVideo}
            disabled={!youtubeUrl.trim() || isProcessing}
            className="relative cursor-pointer h-12 px-8 font-medium text-white 
             transition-all duration-500 ease-in-out
             bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900
             hover:from-blue-800 hover:via-blue-700 hover:to-indigo-800
             shadow-md shadow-blue-950/40 hover:shadow-blue-700/50
             disabled:opacity-70 disabled:cursor-not-allowed rounded-xl"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <span className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                <Search className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-semibold tracking-wide">
                  Analyze Video
                </span>
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
