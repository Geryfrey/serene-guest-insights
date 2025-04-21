
import FeedbackTable from "@/components/feedback/FeedbackTable";
import Header from "@/components/layout/Header";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { mockFeedback } from "@/services/mockData";
import { Feedback } from "@/types";
import { ChevronDown, Download } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const { user } = useAuth();
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv" | null>(null);
  
  // Filter feedback for the current manager's hotel
  const hotelFeedback = user?.role === "admin" 
    ? mockFeedback 
    : mockFeedback.filter(f => f.hotelId === user?.hotelId);
  
  const handleExport = (format: "pdf" | "csv") => {
    setExportFormat(format);
    
    // Simulate export processing
    setTimeout(() => {
      setExportFormat(null);
      
      // In a real app, this would download a file
      console.log(`Exporting feedback as ${format}...`);
    }, 1500);
  };
  
  return (
    <>
      <Header />
      <PageLayout className="p-4 md:p-6 max-w-screen-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-serif">Feedback</h1>
            <p className="text-muted-foreground">
              Review and analyze guest feedback
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
              {exportFormat === "csv" ? (
                <>Exporting...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
              {exportFormat === "pdf" ? (
                <>Exporting...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>
        
        <FeedbackTable 
          feedback={hotelFeedback} 
          onViewDetail={(feedback) => setSelectedFeedback(feedback)} 
        />
      </PageLayout>
      
      <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && setSelectedFeedback(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedFeedback && new Date(selectedFeedback.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Rating</h4>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < selectedFeedback.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Feedback</h4>
                <p>{selectedFeedback.text}</p>
              </div>
              
              {selectedFeedback.sentiment && (
                <>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Sentiment Analysis</h4>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                          ${
                            selectedFeedback.sentiment.sentiment === "positive"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : selectedFeedback.sentiment.sentiment === "negative"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }
                        `}
                      >
                        {selectedFeedback.sentiment.sentiment.charAt(0).toUpperCase() +
                          selectedFeedback.sentiment.sentiment.slice(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Confidence: {Math.round(selectedFeedback.sentiment.score * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {selectedFeedback.sentiment.topics && selectedFeedback.sentiment.topics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedFeedback.sentiment.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {selectedFeedback.contactInfo && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                  <p className="text-sm">{selectedFeedback.contactInfo}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
