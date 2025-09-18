import { Container } from "@/components/ui/container";
import { Clock, Wallet, Frown } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="py-12 lg:py-20 bg-surface">
      <Container>
        <div className="space-y-12">
          <h2 className="font-primary text-jovial-jade text-3xl lg:text-4xl font-bold text-center leading-tight">
            The old way of finding a therapist is broken.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-tag-misc rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-tag-misc-foreground" />
              </div>
              <h3 className="font-secondary font-bold text-lg text-text-primary">
                Wasted Time
              </h3>
              <p className="font-secondary text-text-secondary text-sm leading-relaxed">
                Endless scrolling through text-heavy directories.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto">
                <Wallet className="w-8 h-8 text-warning-foreground" />
              </div>
              <h3 className="font-secondary font-bold text-lg text-text-primary">
                Financial Drain
              </h3>
              <p className="font-secondary text-text-secondary text-sm leading-relaxed">
                Paying for initial sessions that go nowhere.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
                <Frown className="w-8 h-8 text-error-foreground" />
              </div>
              <h3 className="font-secondary font-bold text-lg text-text-primary">
                Mental Exhaustion
              </h3>
              <p className="font-secondary text-text-secondary text-sm leading-relaxed">
                Re-explaining yourself to therapist-after-therapist over and over again.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}