import { Award, Sparkles } from "lucide-react";
import { getServerSession } from "next-auth";

export const WelcomeHeader = async () => {
  const session = await getServerSession();
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-1 text-balance">
              Welcome back, {session?.user?.name || "Anonymous"}
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to explore some YouTube content?
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-full">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Learning Streak: 7 days
          </span>
        </div>
      </div>
    </div>
  );
};
