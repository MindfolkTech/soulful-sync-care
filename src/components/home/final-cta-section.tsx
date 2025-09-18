import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";

export function FinalCtaSection() {
  return (
    <section className="py-12 lg:py-20 bg-garden-green">
      <Container>
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-primary text-white text-3xl lg:text-4xl font-bold leading-tight">
              Ready to find your therapeutic fit?
            </h2>
            <p className="font-secondary text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">
              Explore MindFolk today and discover a more human way to find help.
            </p>
          </div>
          
          <SignUpButton mode="modal">
            <Button 
              size="lg"
              className="bg-white text-garden-green hover:bg-white/90 font-semibold px-8 min-h-touch-min"
            >
              Start Matching for Free
            </Button>
          </SignUpButton>
          
          <div className="pt-4">
            <img 
              src="/images/master-landing-hero-option-a.png"
              alt="Diverse clients collage representing the MindFolk community"
              className="w-64 h-auto mx-auto rounded-lg drop-shadow-lg opacity-90"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}