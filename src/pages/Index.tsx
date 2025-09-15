import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DecorativeShapes } from "@/components/ui/decorative-shapes";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

// Import hero image with high priority
import masterHeroA from "@/assets/Master landing - hero image option A.png";
// Import other assets for lazy loading
import clientHeroImage from "@/assets/Client - Hero image.png";
import clientAutistic20s from "@/assets/Client - White female autistic 20s.png";
import clientWhiteMale20s from "@/assets/Client White male 20s lilac shirt.png";
import therapistBlackFemale40s from "@/assets/Therapist - black female 40s.png";
import therapistWhiteNonbinary30s from "@/assets/Therapist - white nonbinary 30s.png";

export default function Index() {
  // Preload hero image
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = masterHeroA;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-dvh grid grid-rows-[auto_1fr_auto] overflow-hidden"
      style={{ backgroundColor: "var(--warm-white)" }}
    >
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-12 lg:py-20 relative"
          style={{ backgroundColor: "var(--warm-white)" }}
        >
          <Container className="px-6 md:px-8 lg:px-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Hero Content */}
              <div className="max-w-xl space-y-6 md:order-1">
                <h1 
                  className="text-3xl lg:text-5xl font-bold leading-tight"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                >
                  Find the right therapist <em><strong>for you</strong></em>.
                </h1>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-primary)"
                  }}
                >
                  Because everyone's mental health journey is different.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="min-h-touch-target px-8"
                    style={{ 
                      backgroundColor: "var(--btn-primary-bg)", 
                      color: "var(--btn-primary-text)" 
                    }}
                    asChild
                  >
                    <Link 
                      to="/assessment"
                      aria-label="Start the 3-minute compatibility quiz"
                    >
                      Start Your Journey
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="min-h-touch-target px-8 border-garden-green text-btn-secondary-text hover:bg-garden-green/10"
                    asChild
                  >
                    <Link to="/therapist">For Therapists</Link>
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative md:order-2 flex-1">
                <DecorativeShapes variant="lines" className="opacity-30" />
                <img 
                  src={masterHeroA}
                  alt="Four diverse clients in organic editorial shapes on warm cream background"
                  className="w-full h-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Why Compatibility Matters */}
        <section 
          className="py-16 lg:py-20 relative"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <DecorativeShapes variant="abstract" className="opacity-20" />
          <Container className="px-6 md:px-8 lg:px-10">
            <h2 
              className="text-2xl lg:text-4xl font-bold text-center mb-12"
              style={{ 
                fontFamily: "var(--font-primary)",
                color: "var(--jovial-jade)"
              }}
            >
              Why compatibility matters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <div 
                  className="text-4xl lg:text-5xl font-bold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                  aria-label="Average of six therapists to find a fit"
                >
                  6<span className="text-2xl">therapists</span>
                </div>
                <p 
                  className="text-text-secondary leading-relaxed"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  On average it takes trying six therapists to find the right fit.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div 
                  className="text-4xl lg:text-5xl font-bold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                  aria-label="Fifty-seven percent give up after one or two mismatches"
                >
                  57%
                </div>
                <p 
                  className="text-text-secondary leading-relaxed"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  give up after 1–2 mismatches.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div 
                  className="text-4xl lg:text-5xl font-bold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                  aria-label="Ninety-seven percent say comfort is the top factor"
                >
                  97%
                </div>
                <p 
                  className="text-text-secondary leading-relaxed"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  say comfort with the therapist is the #1 factor.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section 
          className="py-16 lg:py-20"
          style={{ backgroundColor: "var(--surface-accent)" }}
        >
          <Container className="px-6 md:px-8 lg:px-10">
            <h2 
              className="text-2xl lg:text-4xl font-bold text-center mb-12"
              style={{ 
                fontFamily: "var(--font-primary)",
                color: "var(--jovial-jade)"
              }}
            >
              How it works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center space-y-4">
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: "var(--jovial-jade)" }}
                >
                  1
                </div>
                <h3 
                  className="font-semibold text-lg"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--text-primary)"
                  }}
                >
                  Take our 3-minute quiz
                </h3>
                <p 
                  className="text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Tell us your goals and preferences.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: "var(--jovial-jade)" }}
                >
                  2
                </div>
                <h3 
                  className="font-semibold text-lg"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--text-primary)"
                  }}
                >
                  Swipe therapist profiles
                </h3>
                <p 
                  className="text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Watch 30–60s intro videos to get a feel for their personality.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: "var(--jovial-jade)" }}
                >
                  3
                </div>
                <h3 
                  className="font-semibold text-lg"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--text-primary)"
                  }}
                >
                  Free chemistry calls
                </h3>
                <p 
                  className="text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Book 15-minute calls with your favourites to check the vibe — no commitment.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: "var(--jovial-jade)" }}
                >
                  4
                </div>
                <h3 
                  className="font-semibold text-lg"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--text-primary)"
                  }}
                >
                  Only pay for sessions
                </h3>
                <p 
                  className="text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  No subscriptions. Switch any time — no hard feelings.
                </p>
              </div>
            </div>

            {/* Client Hero Image */}
            <div className="text-center">
              <img 
                src={clientHeroImage}
                alt="Client portrait with soft editorial overlays"
                className="w-64 h-auto mx-auto"
                loading="lazy"
              />
            </div>
          </Container>
        </section>

        {/* For Clients */}
        <section 
          className="py-16 lg:py-20"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <Container className="px-6 md:px-8 lg:px-10">
            <div className="text-center mb-12 space-y-4">
              <h2 
                className="text-2xl lg:text-4xl font-bold"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)"
                }}
              >
                Find a therapist you click with.
              </h2>
              <div className="max-w-2xl mx-auto space-y-2">
                <p 
                  className="text-lg text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  See beyond credentials — discover personality, communication style, culture and identity.
                </p>
                <p 
                  className="text-lg text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Save time, reduce stress, and avoid mismatched starts.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <img 
                  src={clientAutistic20s}
                  alt="Young autistic woman in sage dungarees with dark green headphones"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <img 
                  src={clientWhiteMale20s}
                  alt="Young white male in lilac shirt, friendly and calm"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <img 
                  src={clientAutistic20s}
                  alt="Black Caribbean woman in cultural dress, warm and approachable"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* For Therapists */}
        <section 
          className="py-16 lg:py-20"
          style={{ backgroundColor: "var(--tag-language-bg)" }}
        >
          <Container className="px-6 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-6">
                <h2 
                  className="text-2xl lg:text-4xl font-bold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                >
                  Are you a therapist? Stand out by being yourself.
                </h2>
                
                <ul className="space-y-3">
                  <li 
                    className="flex items-start"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-garden-green mt-2 mr-3 flex-shrink-0"></span>
                    Set your own rates, availability, and cancellation policy.
                  </li>
                  <li 
                    className="flex items-start"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-garden-green mt-2 mr-3 flex-shrink-0"></span>
                    Attract pre-qualified clients who value your style.
                  </li>
                  <li 
                    className="flex items-start"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-garden-green mt-2 mr-3 flex-shrink-0"></span>
                    All-in-one scheduling, payouts, and simple admin.
                  </li>
                </ul>

                <Button 
                  size="lg" 
                  className="min-h-touch-target px-8"
                  style={{ 
                    backgroundColor: "var(--btn-accent-bg)", 
                    color: "var(--btn-accent-text)" 
                  }}
                  asChild
                >
                  <Link to="/therapist">For Therapists</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={therapistBlackFemale40s}
                  alt="Experienced Black female therapist — calm and professional"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <img 
                  src={therapistWhiteNonbinary30s}
                  alt="White nonbinary therapist in blazer — friendly and expressive"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof */}
        <section 
          className="py-16 lg:py-20 relative"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <DecorativeShapes variant="abstract" className="opacity-15" />
          <Container className="px-6 md:px-8 lg:px-10">
            <TestimonialCarousel 
              items={[
                {
                  quote: "Looking back on the therapists I've tried, one of the biggest things for me is knowing they are my kind of person. This is great for that.",
                  cite: "18–24, non-binary"
                },
                {
                  quote: "Meeting therapist-after-therapist to find a good fit was exhausting. Mindfolk fast-tracks that process.",
                  cite: "35–50, female"
                }
              ]}
            />
          </Container>
        </section>

        {/* Final CTA */}
        <section 
          className="py-16 lg:py-20"
          style={{ backgroundColor: "var(--btn-cta-bg)" }}
        >
          <Container className="px-6 md:px-8 lg:px-10">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 
                  className="text-2xl lg:text-4xl font-bold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                >
                  Ready to find your fit?
                </h2>
                <p 
                  className="text-lg text-text-secondary"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  It takes less than 5 minutes to start.
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="min-h-touch-target px-8"
                style={{ 
                  backgroundColor: "var(--btn-primary-bg)", 
                  color: "var(--btn-primary-text)" 
                }}
                asChild
              >
                <Link to="/assessment">Start My Journey</Link>
              </Button>

              {/* Thumbnail image */}
              <div className="text-center pt-6">
                <img 
                  src={masterHeroA}
                  alt="Diverse clients collage"
                  className="w-32 h-auto mx-auto opacity-60"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}