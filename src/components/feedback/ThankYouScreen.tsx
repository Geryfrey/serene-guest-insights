
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYouScreen() {
  return (
    <Card className="w-full max-w-lg mx-auto text-center animate-fade-in">
      <CardHeader>
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-serif">Thank You!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          Your feedback has been successfully submitted and will help us improve our service.
        </p>
        <p className="text-muted-foreground">
          We greatly appreciate you taking the time to share your experience with us.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-navy-700 to-navy-600 hover:from-navy-800 hover:to-navy-700"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
