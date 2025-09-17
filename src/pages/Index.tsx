import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Images now served from public folder

export default function Index() {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/images/master-landing-hero-option-a.png";
    (link as any).fetchpriority = "high";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div 
      className="grid grid-rows-[auto_1fr_auto] min-h-dvh overflow-x-hidden"
      style={{ backgroundColor: "var(--warm-white)" }}
    >
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-[--space-xl)] lg:py-[--space-2xl)]"
          style={{ backgroundColor: "var(--warm-white)" }}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[--space-lg)] items-center">
              <div className="lg:col-span-5 space-y-[--space-md]">
                <p 
                  className="uppercase tracking-wide"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "hsl(var(--text-secondary))",
                    fontSize: "var(--text-xs)",
                  }}
                >
                  Tired of therapist mismatches?
                </p>
                
                <h1 
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "hsl(var(--jovial-jade))",
                    fontSize: "var(--text-3xl)",
                    maxWidth: "14ch"
                  }}
                >
                  Find the right therapist <em className="italic font-bold">for you</em>.
                </h1>
                
                <p 
                  className="leading-relaxed"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "hsl(var(--text-primary))",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Because everyone's mental health journey is different.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-[--space-sm)]">
                  <Button
                    size="lg"
                    className="min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: "hsl(var(--btn-primary-bg))",
                      color: "hsl(var(--btn-primary-text))",
                      padding: "0 --space-lg)",
                    }}
                    asChild
                  >
                    <Link to="/assessment">Start Your Journey</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: "transparent",
                      color: "hsl(var(--btn-secondary-text))",
                      borderColor: "hsl(var(--garden-green))",
                      padding: "0 --space-lg)",
                    }}
                    asChild
                  >
                    <Link to="/therapist">For Therapists</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <img
                  src="/images/master-landing-hero-option-a.png"
                  alt="Four diverse clients smiling, cropped into organic editorial shapes"
                  className="w-full h-auto drop-shadow-lg"
                  style={{ borderRadius: "var(--radius-lg)" }}
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Why Compatibility Matters Section */}
        <section 
          className="py-12 lg:py-20"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <Container>
            <div className="space-y-12">
              <h2 
                className="text-3xl lg:text-4xl font-bold text-center leading-tight"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)",
                }}
              >
                Why compatibility matters
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div 
                    className="text-4xl lg:text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--jovial-jade)",
                    }}
                  >
                    6 <span className="text-base font-normal">therapists</span>
                  </div>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    On average it takes trying six therapists to find the right fit.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="text-4xl lg:text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--jovial-jade)",
                    }}
                  >
                    57%
                  </div>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    give up after 1–2 mismatches.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div 
                    className="text-4xl lg:text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--jovial-jade)",
                    }}
                  >
                    97%
                  </div>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    say comfort with the therapist is the #1 factor.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section 
          className="py-12 lg:py-20"
          style={{ backgroundColor: "var(--surface-accent)" }}
        >
          <Container>
            <div className="space-y-12">
              <h2 
                className="text-3xl lg:text-4xl font-bold text-center leading-tight"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)",
                }}
              >
                How it works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center space-y-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-[--garden-green] text-[--on-dark] flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    1
                  </div>
                  <h3 
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Take a 3-minute quiz
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Tell us your goals and preferences.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-[--garden-green] text-[--on-dark] flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    2
                  </div>
                  <h3 
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Browse profiles
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Watch 30–60s intro videos to feel their vibe.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-[--garden-green] text-[--on-dark] flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    3
                  </div>
                  <h3 
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Free chemistry calls
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    15 minutes with your favourites — no commitment.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-[--garden-green] text-[--on-dark] flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    4
                  </div>
                  <h3 
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Only pay for sessions
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    No subscriptions. Switch any time.
                  </p>
                </div>
              </div>

              <div className="text-center pt-8">
                <img 
                  src="/images/client-hero-image.png"
                  alt="Client portrait with soft editorial overlays"
                  className="w-72 h-auto mx-auto drop-shadow-md"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* For Clients Section */}
        <section 
          className="py-12 lg:py-20"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <Container>
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-6">
                <h2 
                  className="text-3xl lg:text-4xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)",
                  }}
                >
                  Find a therapist you click with.
                </h2>
                
                <div className="space-y-4">
                  <p 
                    className="text-lg leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    See beyond credentials — discover personality, communication style, culture and identity.
                  </p>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Save time, reduce stress, and avoid mismatched starts.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div>
                  <img 
                    src="/images/client-white-female-autistic-20s.png"
                    alt="Young autistic woman in sage dungarees with dark green headphones, laughing"
                    className="w-full h-auto rounded-lg drop-shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img 
                    src="/images/therapist-black-female-40s.png"
                    alt="Black Caribbean woman in cultural dress, warm and approachable"
                    className="w-full h-auto rounded-lg drop-shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <img 
                    src="/images/client-white-male-20s-lilac-shirt.png"
                    alt="Young white male in lilac shirt, friendly and calm"
                    className="w-full h-auto rounded-lg drop-shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Therapist Band Section */}
        <section 
          className="py-12 lg:py-20"
          style={{ backgroundColor: "var(--tag-language-bg)" }}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-8">
                <h2 
                  className="text-3xl lg:text-4xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)",
                  }}
                >
                  Are you a therapist? Stand out by <em className="italic">being yourself</em>.
                </h2>
                
                <ul className="space-y-4">
                  <li 
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div className="w-2 h-2 bg-garden-green rounded-full mt-2 flex-shrink-0"></div>
                    Set your own rates, availability, and cancellation policy.
                  </li>
                  <li 
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div className="w-2 h-2 bg-garden-green rounded-full mt-2 flex-shrink-0"></div>
                    Attract pre-qualified clients who value your style.
                  </li>
                  <li 
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div className="w-2 h-2 bg-garden-green rounded-full mt-2 flex-shrink-0"></div>
                    All-in-one scheduling, payouts, and simple admin.
                  </li>
                </ul>
                
                <Button
                  size="lg"
                  className="px-8"
                  style={{
                    backgroundColor: "var(--btn-accent-bg)",
                    color: "var(--btn-accent-text)",
                  }}
                  asChild
                >
                  <Link to="/therapist">For Therapists</Link>
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

        {/* Quote Band Section */}
        <section 
          className="py-12 lg:py-20"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <blockquote 
                className="text-2xl lg:text-3xl font-bold italic leading-relaxed"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)",
                  maxWidth: "40ch",
                  margin: "0 auto"
                }}
              >
                "The video intros are genius. You can tell so much about someone's vibe in 30 seconds."
              </blockquote>
              <cite 
                className="text-sm mt-4 block not-italic"
                style={{
                  fontFamily: "var(--font-secondary)",
                  color: "var(--text-secondary)",
                }}
              >
                — 35–44, male
              </cite>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section 
          className="py-12 lg:py-20"
          style={{ backgroundColor: "var(--btn-cta-bg)" }}
        >
          <Container>
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 
                  className="text-3xl lg:text-4xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)",
                  }}
                >
                  Ready to find your fit?
                </h2>
                <p 
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-primary)",
                  }}
                >
                  It takes less than 5 minutes to start.
                </p>
              </div>
              
              <Button
                size="lg"
                className="px-8"
                style={{
                  backgroundColor: "var(--btn-primary-bg)",
                  color: "var(--btn-primary-text)",
                }}
                asChild
              >
                <Link to="/assessment">Start My Journey</Link>
              </Button>
              
              <div className="pt-4">
                <img 
                  src="/images/master-landing-hero-option-a.png"
                  alt="Diverse clients collage"
                  className="w-48 h-auto mx-auto rounded-lg drop-shadow"
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