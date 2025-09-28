import { Card, CardContent } from "@workspace/ui/components/card";
import { ArrowRight, FileText, Plus, TrendingUp, Youtube } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <Card className="group relative overflow-hidden hover:shadow-2xl hover:border hover:border-gray-800 hover:shadow-green-500/10 transition-all duration-500 cursor-pointer border-0 bg-background backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="relative p-10 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-green-600 via-emerald-500 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            <Plus className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="font-bold text-white mb-4 text-xl tracking-tight">
            New Chat
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Start a conversation with any video content
          </p>
          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-5 h-5 text-green-400 animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-2xl hover:border hover:border-gray-800 hover:shadow-red-500/20 transition-all duration-500 cursor-pointer border-0 bg-background backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="relative p-10 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            <Youtube className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="font-bold text-white mb-4 text-xl tracking-tight">
            Analyze Video
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Get instant summaries & chapters
          </p>
          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-2xl hover:border hover:border-gray-800 hover:shadow-purple-500/15 transition-all duration-500 cursor-pointer border-0 bg-background backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="relative p-10 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            <FileText className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="font-bold text-white mb-4 text-xl tracking-tight">
            View Summaries
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Browse your saved summaries
          </p>
          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden hover:shadow-2xl hover:border hover:border-gray-800 hover:shadow-orange-500/15 transition-all duration-500 cursor-pointer border-0 bg-background backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/10 via-transparent to-orange-800/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="relative p-10 text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h3 className="font-bold text-white mb-4 text-xl tracking-tight">
            Analytics
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Track your learning progress
          </p>
          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-5 h-5 text-orange-400 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
