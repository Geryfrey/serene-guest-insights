
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
    positive: "bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-700 border-emerald-200",
    neutral: "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 border-blue-200",
    negative: "bg-gradient-to-br from-red-50 to-rose-100 text-red-700 border-red-200",
  };
  
  const trendClasses = {
    up: "text-emerald-600 bg-emerald-100",
    down: "text-red-600 bg-red-100",
    stable: "text-blue-600 bg-blue-100",
  };

  const progressColors = {
    positive: "from-emerald-500 to-green-600",
    neutral: "from-blue-500 to-indigo-600", 
    negative: "from-red-500 to-rose-600",
  };
  
  return (
    <Card className={cn("overflow-hidden bg-white", className)}>
      <CardHeader className={cn("py-4 px-6 border-b", variantClasses[variant])}>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-slate-800">{percentage}%</div>
            <div className="text-sm text-slate-500">({value} reviews)</div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={cn("h-full bg-gradient-to-r rounded-full transition-all duration-1000", progressColors[variant])}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          {trend && trendValue && (
            <div className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", trendClasses[trend])}>
              <span>{trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}</span>
              <span>{trendValue} from previous period</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
