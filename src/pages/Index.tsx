import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Heart, Video, MessageCircle, Shield, Users, Star, CheckCircle, Clock, Search, Calendar, DollarSign, Award, BookOpen, ArrowRight, Phone, UserCheck, Eye, Book } from "lucide-react";

export default function Index() {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/images/master-landing-hero-option-a.png";
    link.fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--tag-personality))" }}>
          <Container>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="space-y-6 flex-1">
                <h1 className="text-4xl lg:text-6xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                  Find a therapist who truly gets you.
                </h1>
                <p className="text-xl leading-relaxed font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                  Choose from therapists who match your personality, culture, and needs — with free chemistry calls before committing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="min-h-[var(--touch-target-min)]" style={{ 
                    backgroundColor: "hsl(var(--btn-primary-bg))", 
                    color: "hsl(var(--btn-primary-text))" 
                  }}>
                    <Link to="/assessment">Find a Therapist</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="min-h-[var(--touch-target-min)]" style={{ 
                    backgroundColor: "hsl(var(--btn-secondary-bg))", 
                    color: "hsl(var(--btn-secondary-text))",
                    borderColor: "hsl(var(--btn-secondary-border))"
                  }}>
                    <Link to="#how-it-works">
                      See How It Works
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative flex-1 max-w-md mx-auto">
                <img
                  src="/images/master-landing-hero-option-a.png"
                  alt="Professional therapist in modern office"
                  className="w-full h-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Statistics Section */}
        <section className="py-20 lg:py-32" style={{ backgroundColor: "hsl(var(--tag-modality))" }}>
          <Container>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Content Column */}
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                  Why compatibility <em className="italic" style={{ color: "hsl(var(--tag-modality-foreground))" }}>matters</em>
                </h2>
                <p className="text-xl font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                  Research shows the therapeutic relationship is the strongest predictor of successful outcomes.
                </p>
                
                <blockquote className="border-l-4 pl-6 py-4" style={{ borderColor: "hsl(var(--tag-modality-foreground))" }}>
                  <p className="text-lg font-primary italic leading-relaxed" style={{ color: "hsl(var(--text-primary))" }}>
                    "The magic happens when you find someone who truly gets you."
                  </p>
                  <cite className="text-sm font-secondary mt-2 block not-italic" style={{ color: "hsl(var(--text-secondary))" }}>
                    — Dr. Sarah Chen, Clinical Psychology
                  </cite>
                </blockquote>
              </div>

              {/* Stats Column */}
              <div className="flex-1">
                <div className="flex flex-col gap-6">
                  <div className="p-6 rounded-xl text-center" style={{ backgroundColor: "hsl(var(--tag-specialty))" }}>
                    <div className="text-5xl font-primary font-bold mb-2" style={{ color: "hsl(var(--tag-specialty-foreground))" }}>6</div>
                    <p className="text-sm font-secondary" style={{ color: "hsl(var(--tag-specialty-foreground) / 0.8)" }}>
                      therapists on average to find the right fit
                    </p>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="flex-1 p-6 rounded-xl text-center" style={{ backgroundColor: "hsl(var(--tag-language))" }}>
                      <div className="text-5xl font-primary font-bold mb-2" style={{ color: "hsl(var(--tag-language-foreground))" }}>57%</div>
                      <p className="text-sm font-secondary" style={{ color: "hsl(var(--tag-language-foreground) / 0.8)" }}>
                        give up after mismatches
                      </p>
                    </div>
                    
                    <div className="flex-1 p-6 rounded-xl text-center" style={{ backgroundColor: "hsl(var(--tag-misc))" }}>
                      <div className="text-5xl font-primary font-bold mb-2" style={{ color: "hsl(var(--tag-misc-foreground))" }}>97%</div>
                      <p className="text-sm font-secondary" style={{ color: "hsl(var(--tag-misc-foreground) / 0.8)" }}>
                        value therapist comfort
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 lg:py-32" style={{ backgroundColor: "hsl(var(--tag-specialty))" }}>
          <Container>
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl lg:text-5xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                  How it <em className="italic" style={{ color: "hsl(var(--tag-specialty-foreground))" }}>works</em>
                </h2>
                <p className="text-xl font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                  Four simple steps to find your ideal therapeutic match.
                </p>
              </div>

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1 flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(var(--tag-personality))" }}>
                      <span className="text-lg font-bold" style={{ color: "hsl(var(--tag-personality-foreground))" }}>1</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                        Take our 3-minute quiz
                      </h3>
                      <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        Tell us your goals and preferences to create your personalized profile.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Search className="w-16 h-16" style={{ color: "hsl(var(--tag-personality-foreground))" }} />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
                  <div className="flex-1 flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(var(--tag-modality))" }}>
                      <span className="text-lg font-bold" style={{ color: "hsl(var(--tag-modality-foreground))" }}>2</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                        Browse therapist profiles
                      </h3>
                      <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        Watch intro videos and see detailed profiles to find therapists you connect with.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Video className="w-16 h-16" style={{ color: "hsl(var(--tag-modality-foreground))" }} />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1 flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "hsl(var(--tag-language))" }}>
                      <span className="text-lg font-bold" style={{ color: "hsl(var(--tag-language-foreground))" }}>3</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                        Free chemistry calls
                      </h3>
                      <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        Book 15-minute calls with your favorites to check the vibe — no commitment required.
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Phone className="w-16 h-16" style={{ color: "hsl(var(--tag-language-foreground))" }} />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: "hsl(var(--surface) / 0.5)" }}>
                  <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "hsl(var(--tag-misc))" }}>
                      <span className="text-xl font-bold" style={{ color: "hsl(var(--tag-misc-foreground))" }}>4</span>
                    </div>
                    <h3 className="text-2xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                      Only pay for sessions
                    </h3>
                    <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                      No subscriptions. Switch therapists any time — no hard feelings.
                    </p>
                    <Button size="lg" asChild className="mt-4">
                      <Link to="/assessment">Get Started Today</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* For Clients Section */}
        <section className="py-20 lg:py-32" style={{ backgroundColor: "hsl(var(--tag-language))" }}>
          <Container>
            <div className="space-y-12">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                    For <em className="italic" style={{ color: "hsl(var(--tag-language-foreground))" }}>Clients</em>
                  </h2>
                  <p className="text-xl font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    Find a therapist you click with.
                  </p>
                  <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    See beyond credentials — discover personality, communication style, culture and identity. Save time, reduce stress, and avoid mismatched starts.
                  </p>
                </div>
                
                <div className="flex-1">
                  <img 
                    src="/images/client-hero-image.png"
                    alt="Client portrait"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Client Images */}
              <div className="flex flex-wrap gap-6 justify-center">
                <div className="flex-1 min-w-[250px] max-w-[300px]">
                  <img 
                    src="/images/client-white-female-autistic-20s.png"
                    alt="Young autistic woman"
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-[250px] max-w-[300px]">
                  <img 
                    src="/images/client-white-male-20s-lilac-shirt.png"
                    alt="Young white male"
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* For Therapists Section */}
        <section className="py-20 lg:py-32" style={{ backgroundColor: "hsl(var(--tag-misc))" }}>
          <Container>
            <div className="space-y-12">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                    For <em className="italic" style={{ color: "hsl(var(--tag-misc-foreground))" }}>Therapists</em>
                  </h2>
                  <p className="text-xl font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    Stand out by being yourself.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "hsl(var(--surface) / 0.5)" }}>
                      <DollarSign className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "hsl(var(--tag-personality-foreground))" }} />
                      <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        Set your own rates, availability, and cancellation policy
                      </p>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "hsl(var(--surface) / 0.5)" }}>
                      <UserCheck className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "hsl(var(--tag-modality-foreground))" }} />
                      <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        Attract pre-qualified clients who value your unique style
                      </p>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "hsl(var(--surface) / 0.5)" }}>
                      <Shield className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "hsl(var(--tag-language-foreground))" }} />
                      <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                        Build genuine relationships before first sessions
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button size="lg" asChild>
                      <Link to="/therapist">Join as Therapist</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <img 
                    src="/images/therapist-black-female-40s.png"
                    alt="Black female therapist"
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 justify-center">
                <div className="flex-1 min-w-[250px] max-w-[300px]">
                  <img 
                    src="/images/therapist-white-nonbinary-30s.png"
                    alt="White nonbinary therapist"
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 lg:py-32" style={{ backgroundColor: "hsl(var(--tag-specialty))" }}>
          <Container>
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <h2 className="text-4xl lg:text-5xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                  What our <em className="italic" style={{ color: "hsl(var(--tag-specialty-foreground))" }}>community says</em>
                </h2>
              </div>
              
              <div className="p-8 rounded-2xl" style={{ backgroundColor: "hsl(var(--surface) / 0.6)" }}>
                <TestimonialCarousel
                  items={[
                    {
                      quote: "Looking back on the therapists I've tried, one of the biggest things for me is knowing they are my kind of person. This is great for that.",
                      cite: "18–24, non-binary"
                    },
                    {
                      quote: "I've been through so many therapists and this would have saved me a lot of time and heartache.",
                      cite: "25–34, female"
                    },
                    {
                      quote: "The video intros are genius. You can tell so much about someone's vibe in 30 seconds.",
                      cite: "35–44, male"
                    }
                  ]}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 lg:py-32" style={{ backgroundColor: "hsl(var(--tag-modality))" }}>
          <Container>
            <div className="text-center space-y-12">
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-4xl lg:text-5xl font-primary font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                  Ready to find your <em className="italic" style={{ color: "hsl(var(--tag-modality-foreground))" }}>therapist?</em>
                </h2>
                <p className="text-xl font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                  Take our 3-minute quiz and start browsing therapist profiles today.
                </p>
              </div>
              
              <div className="p-8 rounded-2xl max-w-2xl mx-auto" style={{ backgroundColor: "hsl(var(--surface) / 0.8)" }}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" asChild>
                    <Link to="/assessment">Start Your Journey</Link>
                  </Button>
                  <span className="text-sm font-secondary" style={{ color: "hsl(var(--text-secondary))" }}>or</span>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/discover">Browse Therapists</Link>
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t" style={{ borderColor: "hsl(var(--text-primary) / 0.2)" }}>
                  <p className="text-sm font-secondary font-medium" style={{ color: "hsl(var(--text-secondary))" }}>
                    FREE TO START • NO COMMITMENT • 100% CONFIDENTIAL
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

      </main>

      <Footer />
    </div>
  );
}