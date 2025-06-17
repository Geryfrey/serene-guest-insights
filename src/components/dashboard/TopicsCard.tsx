
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TopicDistribution } from "@/types";

interface TopicsCardProps {
  title: string;
  topics: TopicDistribution[];
}

export default function TopicsCard({ title, topics }: TopicsCardProps) {
  const colors = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600", 
    "from-purple-500 to-violet-600",
    "from-orange-500 to-red-600",
    "from-pink-500 to-rose-600",
    "from-cyan-500 to-blue-600",
  ];

  return (
    <Card className="overflow-hidden bg-white shadow-2xl border-0 rounded-2xl">
      <CardHeader className="py-6 px-8 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
        <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {topics.map((topic, index) => (
          <div key={topic.topic} className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700 text-base truncate flex-1 mr-3">
                {topic.topic}
              </span>
              <span className="font-bold text-slate-800 text-xl min-w-[4rem] text-right">
                {topic.percentage}%
              </span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div
                className={cn(
                  "h-full bg-gradient-to-r rounded-full transition-all duration-1000 shadow-sm",
                  colors[index % colors.length]
                )}
                style={{ width: `${topic.percentage}%` }}
              />
            </div>
            <div className="text-sm text-slate-500 font-medium">
              {topic.count} mentions
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
