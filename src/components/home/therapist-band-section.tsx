import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Set your own rates, availability, and cancellation policy.",
  "Attract pre-qualified clients who value your style.", 
  "All-in-one scheduling, payouts, and simple admin."
];

export function TherapistBandSection() {
  return (
    <section className="py-12 lg:py-20 bg-tag-language">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-primary text-jovial-jade text-3xl lg:text-4xl font-bold leading-tight">
              Are you a therapist? Stand out by <em className="italic">being yourself</em>.
            </h2>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-garden-green mt-0.5 flex-shrink-0" />
                  <span className="font-secondary text-text-primary">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
            
            <Button
              size="lg"
              className="bg-btn-accent text-btn-accent-foreground hover:opacity-90 px-8 min-h-touch-min"
            >
              For Therapists
            </Button>
          </div>
          
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img 
              src="/images/therapist-black-female-40s.png"
              alt="Experienced Black female therapist — calm, professional"
              className="w-full h-auto rounded-lg drop-shadow-md"
              loading="lazy"
            />
            <img 
              src="/images/therapist-white-nonbinary-30s.png"
              alt="White nonbinary therapist in blazer — friendly and expressive"
              className="w-full h-auto rounded-lg drop-shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}