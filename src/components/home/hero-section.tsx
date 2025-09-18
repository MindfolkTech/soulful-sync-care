import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SignUpButton } from "@clerk/clerk-react";

export function HeroSection() {
  return (
    <section className="py-12 lg:py-20 bg-warm-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="font-secondary text-text-secondary text-sm uppercase tracking-wide">
              Tired of therapist mismatches?
            </p>
            
            <h1 className="font-primary text-jovial-jade font-bold leading-tight text-3xl lg:text-4xl max-w-[14ch]">
              Find a therapist who actually <em className="italic">gets you</em>.
            </h1>
            
            <p className="font-secondary text-text-primary text-lg leading-relaxed">
              Stop scrolling through therapist directories. Swipe through short, authentic videos to find a fit that clicks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SignUpButton mode="modal">
                <Button 
                  size="lg"
                  className="bg-btn-primary-bg text-btn-primary-text hover:opacity-90 min-h-touch-min"
                >
                  Start Matching for Free
                </Button>
              </SignUpButton>
              <Button
                variant="outline"
                size="lg"
                className="min-h-touch-min border-garden-green text-garden-green hover:bg-garden-green hover:text-white"
              >
                For Therapists
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <img
                src="/images/master-landing-hero-option-a.png"
                alt="Diverse group of people representing potential therapy clients and therapists in a warm, welcoming collage"
                className="w-full h-auto rounded-lg drop-shadow-xl"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-garden-green/10 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}