
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackTrend } from "@/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TrendChartProps {
  title: string;
  data: FeedbackTrend[];
  period?: "daily" | "weekly" | "monthly";
}

export default function TrendChart({ title, data, period = "daily" }: TrendChartProps) {
  // Format the date based on the period
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    
    switch (period) {
      case "daily":
        return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      case "weekly":
        return `Week ${Math.ceil(date.getDate() / 7)}`;
      case "monthly":
        return date.toLocaleDateString(undefined, { month: "short" });
      default:
        return dateStr;
    }
  };
  
  // Filter data for appropriate time frame
  const filteredData = period === "daily" 
    ? data.slice(-14) // Last 14 days
    : period === "weekly"
      ? data.slice(-28) // Last 4 weeks approx
      : data; // All data for monthly
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-3 bg-white border-b dark:bg-card dark:border-border">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-1 pt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={formatDate}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <Tooltip
              formatter={(value, name) => {
                if (name === "positive") return [`${value} (Positive)`, ""];
                if (name === "neutral") return [`${value} (Neutral)`, ""];
                if (name === "negative") return [`${value} (Negative)`, ""];
                return [value, name];
              }}
              labelFormatter={formatDate}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="positive"
              name="Positive"
              stackId="1"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorPositive)"
            />
            <Area
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stackId="1"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorNeutral)"
            />
            <Area
              type="monotone"
              dataKey="negative"
              name="Negative"
              stackId="1"
              stroke="#EF4444"
              fillOpacity={1}
              fill="url(#colorNegative)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
