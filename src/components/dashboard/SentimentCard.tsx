
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SentimentCardProps {
  title: string;
  value: number;
  total?: number;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  variant?: "positive" | "neutral" | "negative";
  icon?: React.ReactNode;
  className?: string;
}

export default function SentimentCard({
  title,
  value,
  total = 100,
  trend,
  trendValue,
  variant = "neutral",
  icon,
  className,
}: SentimentCardProps) {
  const percentage = Math.round((value / total) * 100);
  
  const variantClasses = {
    positive: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    neutral: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    negative: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  };
  
  const trendClasses = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    stable: "text-blue-600 dark:text-blue-400",
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className={cn("py-3", variantClasses[variant])}>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          <div className="flex-1">
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold">{percentage}%</div>
              <div className="text-sm text-muted-foreground ml-2">({value} reviews)</div>
            </div>
            
            {trend && trendValue && (
              <div className={cn("text-xs mt-1", trendClasses[trend])}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue} from previous period
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
