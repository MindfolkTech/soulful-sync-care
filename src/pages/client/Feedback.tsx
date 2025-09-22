import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClientFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Container size="sm">
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-garden-green rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h1 className="font-primary text-3xl font-bold text-text-primary">
                Thank you for your feedback!
              </h1>
              <p className="font-secondary text-lg text-text-secondary">
                Your feedback helps us improve our service and helps other clients find the right therapist.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/appointments")}
                className="min-h-touch-target"
              >
                View Appointments
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/discover")}
                className="min-h-touch-target"
              >
                Find Another Therapist
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <Container size="sm">
        <div className="py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 min-h-touch-target"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="font-primary text-2xl text-center">
                Session Feedback
              </CardTitle>
              <CardDescription className="font-secondary text-center">
                Help us improve by sharing your experience with this session
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-secondary text-base font-medium">
                    How would you rate this session?
                  </Label>
                  
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-colors min-h-touch-target min-w-touch-target",
                          star <= rating 
                            ? "text-amber-400 hover:text-amber-500" 
                            : "text-gray-300 hover:text-gray-400"
                        )}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star 
                          className="w-8 h-8" 
                          fill={star <= rating ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                  </div>
                  
                  {rating > 0 && (
                    <p className="text-center font-secondary text-sm text-text-secondary">
                      {rating === 1 && "We're sorry this session didn't meet your expectations"}
                      {rating === 2 && "We'd like to understand how we can improve"}
                      {rating === 3 && "Thank you for your feedback"}
                      {rating === 4 && "We're glad you had a good experience"}
                      {rating === 5 && "Wonderful! We're delighted you had an excellent session"}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="feedback" className="font-secondary text-base font-medium">
                    Additional feedback (optional)
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share any specific thoughts about your session, what went well, or areas for improvement..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] font-secondary"
                    rows={5}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="min-h-touch-target"
                  >
                    Skip for Now
                  </Button>
                  <Button
                    type="submit"
                    disabled={rating === 0 || isLoading}
                    className="min-h-touch-target"
                  >
                    {isLoading ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}