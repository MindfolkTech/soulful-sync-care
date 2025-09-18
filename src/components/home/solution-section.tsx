import { Container } from "@/components/ui/container";
import { Play, MessageCircle, Calendar } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-12 lg:py-20 bg-surface-accent">
      <Container>
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-primary text-jovial-jade text-3xl lg:text-4xl font-bold leading-tight mb-4">
              You are a person. Not a <em className="italic">patient</em>.
            </h2>
            <p className="font-secondary text-text-primary text-lg">
              Here's a better way to find your therapeutic fit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 bg-garden-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <Play className="absolute top-0 right-1/2 transform translate-x-8 -translate-y-2 w-6 h-6 text-garden-green" />
              </div>
              <h3 className="font-primary font-bold text-xl text-text-primary">
                Watch & Swipe
              </h3>
              <p className="font-secondary text-text-secondary leading-relaxed">
                Get a real feel for a therapist's personality with short video intros. See who you vibe with.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
                <img
                  src="/images/therapist-white-female-20s.png"
                  alt="Young therapist introducing herself in a video"
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 bg-garden-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <MessageCircle className="absolute top-0 right-1/2 transform translate-x-8 -translate-y-2 w-6 h-6 text-garden-green" />
              </div>
              <h3 className="font-primary font-bold text-xl text-text-primary">
                Chat & Check
              </h3>
              <p className="font-secondary text-text-secondary leading-relaxed">
                Book a free 15-minute chemistry call with your favs. No commitment.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
                <div className="space-y-2">
                  <div className="bg-tag-personality-bg p-2 rounded text-sm">
                    "Hi! I'd love to chat about your goals..."
                  </div>
                  <div className="bg-surface-accent p-2 rounded text-sm text-right">
                    "That sounds perfect!"
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 bg-garden-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <Calendar className="absolute top-0 right-1/2 transform translate-x-8 -translate-y-2 w-6 h-6 text-garden-green" />
              </div>
              <h3 className="font-primary font-bold text-xl text-text-primary">
                Book with Confidence
              </h3>
              <p className="font-secondary text-text-secondary leading-relaxed">
                Start your therapy journey knowing you've already made a genuine connection.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
                <div className="text-center">
                  <div className="text-success-text font-bold">✓ Perfect Match</div>
                  <div className="text-sm text-text-secondary mt-1">Session confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}