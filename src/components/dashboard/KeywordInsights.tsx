
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface KeywordFrequency {
  counts: number[];
  labels: string[];
}

interface KeywordInsightsProps {
  data: KeywordFrequency;
}

const chartConfig = {
  count: {
    label: "Frequency",
    color: "#10B981",
  },
};

export default function KeywordInsights({ data }: KeywordInsightsProps) {
  const chartData = data.labels.map((label, index) => ({
    keyword: label,
    count: data.counts[index],
  }));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-3 bg-navy-50 text-navy-700 dark:bg-navy-900 dark:text-navy-300">
        <CardTitle className="text-sm font-medium">Top Keywords</CardTitle>
      </CardHeader>
      <CardContent className="p-1 pt-4 h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="keyword" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="count"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
