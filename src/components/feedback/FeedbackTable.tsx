
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Feedback } from "@/types";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BadgeCheck, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeedbackTableProps {
  feedback: Feedback[];
  onViewDetail?: (feedback: Feedback) => void;
}

export default function FeedbackTable({ feedback, onViewDetail }: FeedbackTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterSentiment, setFilterSentiment] = useState<string | null>(null);
  
  const itemsPerPage = 10;
  
  // Filter feedback based on search and filters
  const filteredFeedback = feedback.filter((item) => {
    // Search filter
    const searchMatch = !search || 
      item.text.toLowerCase().includes(search.toLowerCase()) ||
      (item.sentiment?.topics?.some(topic => topic.toLowerCase().includes(search.toLowerCase())));
    
    // Rating filter
    const ratingMatch = filterRating === null || item.rating === filterRating;
    
    // Sentiment filter
    const sentimentMatch = filterSentiment === null || item.sentiment?.sentiment === filterSentiment;
    
    return searchMatch && ratingMatch && sentimentMatch;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedFeedback = filteredFeedback.slice(startIndex, startIndex + itemsPerPage);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  // Get sentiment badge color
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300";
      case "neutral":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300";
      case "negative":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Rating
                {filterRating !== null && (
                  <Badge variant="secondary" className="ml-2">
                    {filterRating}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterRating(null)}>
                All Ratings
              </DropdownMenuItem>
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuItem key={rating} onClick={() => setFilterRating(rating)}>
                  {rating} {rating === 1 ? "Star" : "Stars"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Sentiment
                {filterSentiment && (
                  <Badge variant="secondary" className="ml-2">
                    {filterSentiment.charAt(0).toUpperCase() + filterSentiment.slice(1)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterSentiment(null)}>
                All Sentiments
              </DropdownMenuItem>
              {["positive", "neutral", "negative"].map((sentiment) => (
                <DropdownMenuItem key={sentiment} onClick={() => setFilterSentiment(sentiment)}>
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(filterRating !== null || filterSentiment !== null || search) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterRating(null);
                setFilterSentiment(null);
                setSearch("");
              }}
              className="h-10"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Topics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFeedback.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No feedback found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedFeedback.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onViewDetail?.(item)}
                >
                  <TableCell className="whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < item.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate">{item.text}</div>
                  </TableCell>
                  <TableCell>
                    {item.sentiment && (
                      <Badge className={getSentimentColor(item.sentiment.sentiment)}>
                        {item.sentiment.sentiment.charAt(0).toUpperCase() +
                          item.sentiment.sentiment.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.sentiment?.topics?.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFeedback.length)} of{" "}
            {filteredFeedback.length} items
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
