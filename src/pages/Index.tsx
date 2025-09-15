import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DecorativeShapes } from "@/components/ui/decorative-shapes";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";


export default function Index() {
  // Preload hero image for better performance
  React.useEffect(() => {
    const img = new Image();
    img.src = "/images/master-landing-hero-option-a.png";
  }, []);

  return (
    <div className="min-h-screen bg-surface-primary">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-32">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                    Meet Your Perfect
                    <span className="block text-primary">Therapist Match</span>
                  </h1>
                  <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                    Discover therapists who truly understand you through our personality-based matching system. 
                    Find the therapeutic connection that feels right from the very first session.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/assessment">Take Free Quiz</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/discover">Browse Therapists</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/master-landing-hero-option-a.png" 
                  alt="Diverse group of people representing our therapy community"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Statistics Section */}
        <section className="bg-surface-secondary py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Why Personality Matters in Therapy
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Research shows that the therapist-client relationship is the foundation of successful outcomes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-8 bg-surface-primary rounded-2xl shadow-sm">
                <div className="text-5xl font-bold text-primary mb-4">73%</div>
                <p className="text-lg text-text-secondary">of therapy outcomes depend on the therapist-client relationship</p>
              </div>
              <div className="text-center p-8 bg-surface-primary rounded-2xl shadow-sm">
                <div className="text-5xl font-bold text-primary mb-4">2.3x</div>
                <p className="text-lg text-text-secondary">better outcomes with personality-matched therapists</p>
              </div>
              <div className="text-center p-8 bg-surface-primary rounded-2xl shadow-sm">
                <div className="text-5xl font-bold text-primary mb-4">89%</div>
                <p className="text-lg text-text-secondary">of clients continue with matched therapists</p>
              </div>
            </div>
            
            <div className="text-center bg-primary/5 p-8 rounded-2xl">
              <blockquote className="text-2xl font-medium text-text-primary leading-relaxed mb-4">
                "The therapeutic relationship is the most important factor in successful therapy outcomes."
              </blockquote>
              <cite className="text-lg text-text-secondary">— American Psychological Association</cite>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                How It Works
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Four simple steps to find your ideal therapeutic match.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Take Our Quiz
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Tell us your goals and preferences in just 3 minutes.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Browse Profiles
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Watch intro videos to get a feel for their personality.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Chemistry Calls
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Book free 15-minute calls to check the vibe.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Book Sessions
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Only pay for sessions. Switch anytime, no hard feelings.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/assessment">Get Started Today</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* For Clients Section */}
        <section className="bg-surface-secondary py-20">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">
                  For Clients
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Find a therapist you click with. See beyond credentials — discover personality, 
                  communication style, culture and identity. Save time, reduce stress, and avoid mismatched starts.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <p className="text-lg text-text-secondary">Watch therapist intro videos</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <p className="text-lg text-text-secondary">Filter by personality and approach</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <p className="text-lg text-text-secondary">Book free chemistry calls</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/client-white-female-autistic-20s.png"
                  alt="Young autistic woman in sage dungarees with dark green headphones"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
                <img 
                  src="/images/client-white-male-20s-lilac-shirt.png"
                  alt="Young white male in lilac shirt, friendly and calm"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* For Therapists Section */}
        <section className="py-20">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">
                  For Therapists
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Stand out by being yourself. Focus on what matters most — building meaningful connections with clients.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      Set your own rates, availability, and cancellation policy
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      Attract pre-qualified clients who value your unique style
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      All-in-one scheduling, payouts, and simple admin
                    </p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/therapist">Join as Therapist</Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/therapist-black-female-40s.png"
                  alt="Experienced Black female therapist — calm and professional"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
                <img 
                  src="/images/therapist-white-nonbinary-30s.png"
                  alt="White nonbinary therapist in blazer — friendly and expressive"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof Section */}
        <section className="bg-surface-secondary py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                What Our Community Says
              </h2>
            </div>
            
            <div className="bg-surface-primary p-12 rounded-3xl shadow-sm">
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
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-primary/5">
          <Container>
            <div className="text-center space-y-8">
              <h2 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Ready to Find Your
                <span className="block text-primary">Perfect Therapist?</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Take our 3-minute quiz and start connecting with therapists who truly understand you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/assessment">Start Your Journey</Link>
                </Button>
                <div className="text-text-secondary text-lg">or</div>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/discover">Browse Therapists</Link>
                </Button>
              </div>
              
              <div className="pt-8">
                <p className="text-sm text-text-secondary font-medium tracking-wide">
                  FREE TO START • NO COMMITMENT • 100% CONFIDENTIAL
                </p>
              </div>
            </div>
          </Container>
        </section>

      </main>

      <Footer />
    </div>
  );
}