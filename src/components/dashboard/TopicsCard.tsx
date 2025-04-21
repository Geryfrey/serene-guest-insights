
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicDistribution } from "@/types";

interface TopicsCardProps {
  title: string;
  topics: TopicDistribution[];
}

export default function TopicsCard({ title, topics }: TopicsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-3 bg-navy-50 text-navy-700 dark:bg-navy-900 dark:text-navy-300">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {topics.map((topic) => (
          <div key={topic.topic} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{topic.topic}</span>
              <span className="font-medium">{topic.percentage}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-navy-600 rounded-full"
                style={{ width: `${topic.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
