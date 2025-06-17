
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface AnomalyData {
  Batch: number;
  Negative_Count: number;
  Z_Score: number;
}

interface AnomalyChartProps {
  data: AnomalyData[];
}

const chartConfig = {
  Z_Score: {
    label: "Z-Score",
    color: "#3B82F6",
  },
  Negative_Count: {
    label: "Negative Count",
    color: "#EF4444",
  },
};

export default function AnomalyChart({ data }: AnomalyChartProps) {
  // Identify anomalies (Z-Score > 2 or < -2)
  const anomalies = data.filter(item => Math.abs(item.Z_Score) > 2);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-3 bg-navy-50 text-navy-700 dark:bg-navy-900 dark:text-navy-300">
        <CardTitle className="text-sm font-medium">
          Anomaly Detection ({anomalies.length} anomalies detected)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 pt-4 h-80">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="Batch" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="Z_Score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={(props) => {
                  const isAnomaly = Math.abs(props.payload?.Z_Score || 0) > 2;
                  return isAnomaly ? (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={4} 
                      fill="#EF4444" 
                      stroke="#EF4444"
                    />
                  ) : false;
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
