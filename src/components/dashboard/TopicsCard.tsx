
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="overflow-hidden bg-white">
      <CardHeader className="py-4 px-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
        <CardTitle className="text-lg font-semibold text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {topics.map((topic, index) => (
          <div key={topic.topic} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700 text-sm truncate flex-1 mr-2">
                {topic.topic}
              </span>
              <span className="font-bold text-slate-800 text-lg min-w-[3rem] text-right">
                {topic.percentage}%
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full bg-gradient-to-r rounded-full transition-all duration-1000",
                  colors[index % colors.length]
                )}
                style={{ width: `${topic.percentage}%` }}
              />
            </div>
            <div className="text-xs text-slate-500">
              {topic.count} mentions
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
