
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { mockHotels, mockTopicDistribution, mockTrends } from "@/services/mockData";
import { BarChart } from "@tremor/react";
import { format, subDays } from "date-fns";
import { Download, Filter } from "lucide-react";
import { useState } from "react";
import TrendChart from "@/components/dashboard/TrendChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Reports() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv" | null>(null);
  
  // Get hotel info
  const hotelId = user?.hotelId || "";
  const hotelName = mockHotels.find(h => h.id === hotelId)?.name || "All Hotels";
  
  // Calculate date ranges for report
  const today = new Date();
  const lastWeekStart = format(subDays(today, 7), "MMM d");
  const lastWeekEnd = format(today, "MMM d, yyyy");
  const lastMonthStart = format(subDays(today, 30), "MMM d");
  const lastMonthEnd = format(today, "MMM d, yyyy");
  
  // Sample data for weekly and monthly comparison tables
  const comparisonData = [
    { metric: "Total Feedback", current: 124, previous: 105, change: "+18.1%" },
    { metric: "Positive Sentiment", current: "71.8%", previous: "68.5%", change: "+3.3%" },
    { metric: "Negative Sentiment", current: "14.5%", previous: "19.0%", change: "-4.5%" },
    { metric: "Response Rate", current: "92.3%", previous: "87.6%", change: "+4.7%" },
    { metric: "Average Rating", current: "4.2", previous: "3.9", change: "+0.3" },
  ];
  
  // Sample category performance data
  const categoryPerformance = [
    { category: "Room Cleanliness", score: 4.5, change: "+0.2" },
    { category: "Staff Service", score: 4.7, change: "+0.1" },
    { category: "Food Quality", score: 4.2, change: "+0.3" },
    { category: "Amenities", score: 4.1, change: "-0.1" },
    { category: "Check-in Experience", score: 4.3, change: "+0.2" },
    { category: "Value for Money", score: 3.9, change: "+0.1" },
  ];
  
  // Mock data for bar chart
  const sentimentBySource = [
    {
      source: "Web Form",
      Positive: 65,
      Neutral: 20,
      Negative: 15,
    },
    {
      source: "In-Room Tablet",
      Positive: 72,
      Neutral: 18,
      Negative: 10,
    },
    {
      source: "Google Reviews",
      Positive: 58,
      Neutral: 22,
      Negative: 20,
    },
    {
      source: "Email Survey",
      Positive: 68,
      Neutral: 25,
      Negative: 7,
    },
  ];
  
  const handleExport = (format: "pdf" | "csv") => {
    setExportFormat(format);
    
    // Simulate export processing
    setTimeout(() => {
      setExportFormat(null);
      
      // In a real app, this would download a file
      console.log(`Exporting ${period} report as ${format}...`);
    }, 1500);
  };
  
  return (
    <>
      <Header />
      <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif">Reports</h1>
            <p className="text-muted-foreground">
              Detailed analytics and insights for {hotelName}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  {exportFormat === "pdf" ? "Exporting..." : "Export as PDF"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  {exportFormat === "csv" ? "Exporting..." : "Export as CSV"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="categories">Category Performance</TabsTrigger>
            <TabsTrigger value="sources">Feedback Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif">Performance Overview</h2>
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                <Button
                  variant={period === "daily" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("daily")}
                  className="text-xs h-8"
                >
                  Daily
                </Button>
                <Button
                  variant={period === "weekly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("weekly")}
                  className="text-xs h-8"
                >
                  Weekly
                </Button>
                <Button
                  variant={period === "monthly" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPeriod("monthly")}
                  className="text-xs h-8"
                >
                  Monthly
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Sentiment Trend</CardTitle>
                  <CardDescription>
                    {period === "daily"
                      ? "Last 14 days"
                      : period === "weekly"
                      ? `${lastWeekStart} - ${lastWeekEnd}`
                      : `${lastMonthStart} - ${lastMonthEnd}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TrendChart title="" data={mockTrends} period={period} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Performance Comparison</CardTitle>
                  <CardDescription>
                    {period === "daily"
                      ? "vs Previous 14 days"
                      : period === "weekly"
                      ? "vs Previous Week"
                      : "vs Previous Month"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead className="text-right">Current</TableHead>
                        <TableHead className="text-right">Previous</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comparisonData.map((item) => (
                        <TableRow key={item.metric}>
                          <TableCell className="font-medium">{item.metric}</TableCell>
                          <TableCell className="text-right">{item.current}</TableCell>
                          <TableCell className="text-right">{item.previous}</TableCell>
                          <TableCell
                            className={`text-right ${
                              item.change.startsWith("+")
                                ? "text-green-600"
                                : item.change.startsWith("-")
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {item.change}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                  <CardDescription>
                    Sentiment distribution over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TrendChart title="" data={mockTrends} period={period} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Topic Distribution</CardTitle>
                  <CardDescription>
                    Most mentioned topics in feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Topic</TableHead>
                        <TableHead className="text-right">%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTopicDistribution.map((topic) => (
                        <TableRow key={topic.topic}>
                          <TableCell>{topic.topic}</TableCell>
                          <TableCell className="text-right">{topic.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Anomalies</CardTitle>
                <CardDescription>
                  Unusual sentiment patterns detected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-red-500" />
                      <div>
                        <p className="font-medium">
                          Negative sentiment spike detected on May 15, 2023
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          70% increase in negative feedback related to "Room Cleanliness"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
                      <div>
                        <p className="font-medium">
                          Declining sentiment trend for "Food Quality" over past 14 days
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Average sentiment score decreased from 4.2 to 3.7
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium">
                          Positive sentiment improvement for "Staff Service"
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          30% increase in positive mentions following recent training program
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>
                  Average ratings across different service categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Score (1-5)</TableHead>
                      <TableHead className="text-right">vs. Last Period</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryPerformance.map((category) => (
                      <TableRow key={category.category}>
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium mr-2">{category.score}</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.floor(category.score)
                                      ? "text-yellow-500"
                                      : i + 1 > Math.ceil(category.score)
                                      ? "text-gray-300"
                                      : "text-yellow-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`text-right ${
                            category.change.startsWith("+")
                              ? "text-green-600"
                              : category.change.startsWith("-")
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {category.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Categories</CardTitle>
                  <CardDescription>
                    Categories with highest guest satisfaction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Staff Service</span>
                        <span className="font-medium">4.7 / 5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "94%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Exceptional staff" mentioned in 47 reviews
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Room Cleanliness</span>
                        <span className="font-medium">4.5 / 5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Immaculate rooms" mentioned in 38 reviews
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Check-in Experience</span>
                        <span className="font-medium">4.3 / 5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "86%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Smooth check-in" mentioned in 29 reviews
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>
                    Categories with lower guest satisfaction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Value for Money</span>
                        <span className="font-medium">3.9 / 5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "78%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Expensive for what you get" mentioned in 22 reviews
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Amenities</span>
                        <span className="font-medium">4.1 / 5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "82%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Limited gym equipment" mentioned in 15 reviews
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Food Quality</span>
                        <span className="font-medium">4.2 / 5</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "84%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Limited menu options" mentioned in 18 reviews
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback by Source</CardTitle>
                <CardDescription>
                  Sentiment breakdown across different feedback channels
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  className="h-full"
                  data={sentimentBySource}
                  index="source"
                  categories={["Positive", "Neutral", "Negative"]}
                  colors={["emerald", "blue", "rose"]}
                  stack
                  valueFormatter={(v) => `${v}%`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Web Form</CardTitle>
                  <CardDescription>
                    Guest feedback submitted via website
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Submissions</span>
                      <span className="font-medium">248</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Rating</span>
                      <span className="font-medium">4.1 / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sentiment</span>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-sm">65%</span>
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm">20%</span>
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-sm">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">In-Room Tablet</CardTitle>
                  <CardDescription>
                    Feedback collected from in-room devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Submissions</span>
                      <span className="font-medium">176</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Rating</span>
                      <span className="font-medium">4.3 / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Usage Rate</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sentiment</span>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-sm">72%</span>
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm">18%</span>
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-sm">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Google Reviews</CardTitle>
                  <CardDescription>
                    Reviews collected from Google Business
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Reviews</span>
                      <span className="font-medium">118</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Rating</span>
                      <span className="font-medium">4.0 / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sentiment</span>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-sm">58%</span>
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm">22%</span>
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-sm">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageLayout>
    </>
  );
}
