import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WaitlistSuccess() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-[hsl(var(--success-bg))] rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[hsl(var(--success-text))]" />
              </div>
              <CardTitle className="font-primary text-2xl text-[hsl(var(--text-primary))]">
                You're on the waitlist!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-secondary text-[hsl(var(--text-secondary))]">
                Thank you for joining our waitlist. We'll notify you as soon as MindFolk is ready for you.
              </p>
              
              <div className="bg-[hsl(var(--surface-accent))] p-4 rounded-[--radius-md]">
                <p className="font-secondary text-sm text-[hsl(var(--text-primary))]">
                  <strong>What's next?</strong><br />
                  Check your email for a confirmation and we'll keep you updated on our progress.
                </p>
              </div>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  Back to Homepage
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}