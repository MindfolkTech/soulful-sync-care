import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DecorativeShapes } from "@/components/ui/decorative-shapes";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";


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
    <div
      className="min-h-dvh grid grid-rows-[auto_1fr_auto] overflow-hidden"
      style={{ backgroundColor: "var(--warm-white)" }}
    >
      <Header />

      <main className="flex-1">

        {/* Hero Section */}
        <section className="py-12 lg:py-20 relative">
          <Container className="px-6 md:px-8 lg:px-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="max-w-xl space-y-6 md:order-1">
                <p
                  className="text-sm uppercase tracking-wide"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Tired of therapist mismatches?
                </p>
                <h1
                  className="text-3xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)",
                  }}
                >
                  Find the right therapist <em><strong>for you</strong></em>.
                </h1>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-primary)",
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
                      color: "var(--btn-primary-text)",
                    }}
                    asChild
                  >
                    <Link to="/assessment">Start Your Journey</Link>
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
              <div className="relative md:order-2 flex-1">
                <DecorativeShapes variant="lines" className="opacity-30" />
                <img
                  src="/images/master-landing-hero-option-a.png"
                  alt="Four diverse clients in organic editorial shapes on warm cream background"
                  className="w-full h-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Statistics Section - Editorial Magazine Style */}
        <section className="py-24 md:py-32 bg-tag-modality">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Editorial Content */}
              <div className="space-y-12">
                <div className="space-y-8">
                  <h2 className="font-primary text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
                    Why compatibility 
                    <em className="italic text-garden-green block">matters</em>
                  </h2>
                  <p className="font-secondary text-2xl md:text-3xl text-text-secondary leading-[1.3] font-light max-w-2xl">
                    Research shows the therapeutic relationship is the strongest predictor of successful outcomes.
                  </p>
                </div>
                
                {/* Pull Quote */}
                <blockquote className="border-l-4 border-jovial-jade pl-8 py-6 bg-surface/50 rounded-r-lg">
                  <p className="font-primary text-2xl md:text-3xl italic text-text-primary leading-[1.2]">
                    "The magic happens when you find someone who truly gets you."
                  </p>
                  <cite className="font-secondary text-lg text-text-secondary mt-4 block not-italic">
                    — Dr. Sarah Chen, Clinical Psychology
                  </cite>
                </blockquote>
              </div>

              {/* Right Column - Asymmetrical Stats */}
              <div className="space-y-8">
                <div className="bg-tag-specialty p-8 rounded-2xl text-right">
                  <div className="text-7xl md:text-8xl font-primary font-bold text-tag-specialty-foreground mb-4">
                    6
                  </div>
                  <p className="font-secondary text-xl text-tag-specialty-foreground/80 leading-relaxed">
                    therapists on average to find the right fit
                  </p>
                </div>
                
                <div className="bg-tag-language p-8 rounded-2xl text-center -ml-8">
                  <div className="text-7xl md:text-8xl font-primary font-bold text-tag-language-foreground mb-4">
                    57%
                  </div>
                  <p className="font-secondary text-xl text-tag-language-foreground/80 leading-relaxed">
                    give up after 1-2 mismatches
                  </p>
                </div>
                
                <div className="bg-tag-misc p-8 rounded-2xl text-left ml-8">
                  <div className="text-7xl md:text-8xl font-primary font-bold text-tag-misc-foreground mb-4">
                    97%
                  </div>
                  <p className="font-secondary text-xl text-tag-misc-foreground/80 leading-relaxed">
                    say therapist comfort is the #1 factor
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section - Editorial Flow */}
        <section className="py-24 md:py-32 bg-tag-specialty">
          <Container>
            <div className="space-y-20">
              {/* Section Header */}
              <div className="text-center max-w-4xl mx-auto space-y-8">
                <h2 className="font-primary text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
                  How it 
                  <em className="italic text-tag-specialty-foreground block">works</em>
                </h2>
                <p className="font-secondary text-2xl md:text-3xl text-text-secondary leading-[1.3] font-light">
                  Four simple steps to find your ideal therapeutic match.
                </p>
              </div>

              {/* Editorial Step Flow */}
              <div className="space-y-16">
                {/* Step 1 - Left Aligned */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-tag-personality rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-tag-personality-foreground">1</span>
                      </div>
                      <h3 className="font-primary text-3xl md:text-4xl font-bold text-text-primary">
                        Take our 3-minute quiz
                      </h3>
                    </div>
                    <p className="font-secondary text-xl md:text-2xl text-text-secondary leading-relaxed pl-22">
                      Tell us your goals and preferences to create your personalized profile.
                    </p>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="inline-block bg-tag-personality/30 p-6 rounded-2xl">
                      <span className="font-primary text-6xl text-tag-personality-foreground">01</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Right Aligned */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="text-center lg:text-left lg:order-1">
                    <div className="inline-block bg-tag-modality/30 p-6 rounded-2xl">
                      <span className="font-primary text-6xl text-tag-modality-foreground">02</span>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-6 lg:order-2">
                    <div className="flex items-center gap-6 justify-end lg:flex-row-reverse">
                      <div className="w-16 h-16 bg-tag-modality rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-tag-modality-foreground">2</span>
                      </div>
                      <h3 className="font-primary text-3xl md:text-4xl font-bold text-text-primary text-right">
                        Swipe therapist profiles
                      </h3>
                    </div>
                    <p className="font-secondary text-xl md:text-2xl text-text-secondary leading-relaxed text-right pr-22">
                      Watch 30-60s intro videos to get a feel for their personality and approach.
                    </p>
                  </div>
                </div>

                {/* Step 3 - Left Aligned */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-tag-language rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-tag-language-foreground">3</span>
                      </div>
                      <h3 className="font-primary text-3xl md:text-4xl font-bold text-text-primary">
                        Free chemistry calls
                      </h3>
                    </div>
                    <p className="font-secondary text-xl md:text-2xl text-text-secondary leading-relaxed pl-22">
                      Book 15-minute calls with your favorites to check the vibe — no commitment required.
                    </p>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="inline-block bg-tag-language/30 p-6 rounded-2xl">
                      <span className="font-primary text-6xl text-tag-language-foreground">03</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 - Center Aligned */}
                <div className="text-center space-y-8 bg-surface/50 p-12 rounded-3xl max-w-4xl mx-auto">
                  <div className="flex items-center justify-center gap-6">
                    <div className="w-20 h-20 bg-tag-misc rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-tag-misc-foreground">4</span>
                    </div>
                    <h3 className="font-primary text-3xl md:text-4xl font-bold text-text-primary">
                      Only pay for sessions
                    </h3>
                  </div>
                  <p className="font-secondary text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                    No subscriptions. Switch therapists any time — no hard feelings.
                  </p>
                  <div className="pt-6">
                    <Button size="lg" className="text-xl px-10 py-8 h-auto font-medium" asChild>
                      <Link to="/assessment">Get Started Today</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Client Hero Image - Editorial Placement */}
              <div className="text-center pt-8">
                <img 
                  src="/images/client-hero-image.png"
                  alt="Client portrait with soft editorial overlays"
                  className="w-72 h-auto mx-auto opacity-80"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* For Clients Section - Editorial Layout */}
        <section className="py-24 md:py-32 bg-tag-language">
          <Container>
            <div className="space-y-20">
              {/* Section Header - Asymmetrical */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                <div className="space-y-8">
                  <h2 className="font-primary text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
                    For 
                    <em className="italic text-tag-language-foreground block">Clients</em>
                  </h2>
                  <div className="space-y-6">
                    <p className="font-secondary text-2xl md:text-3xl text-text-secondary leading-[1.3] font-light">
                      Find a therapist you click with.
                    </p>
                    <p className="font-secondary text-xl text-text-secondary leading-relaxed">
                      See beyond credentials — discover personality, communication style, culture and identity. Save time, reduce stress, and avoid mismatched starts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Editorial Grid - Asymmetrical */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <img 
                    src="/images/client-white-female-autistic-20s.png"
                    alt="Young autistic woman in sage dungarees with dark green headphones"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-4 lg:col-start-7 lg:row-start-1">
                  <img 
                    src="/images/client-white-male-20s-lilac-shirt.png"
                    alt="Young white male in lilac shirt, friendly and calm"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-3 lg:col-start-10 lg:row-start-1 flex items-end">
                  <img 
                    src="/images/therapist-black-female-40s.png"
                    alt="Black Caribbean woman in cultural dress, warm and approachable"
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* For Therapists Section - Editorial Two-Column */}
        <section className="py-24 md:py-32 bg-tag-misc">
          <Container>
            <div className="space-y-20">
              {/* Section Header */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
                <div className="lg:col-span-2 space-y-8">
                  <h2 className="font-primary text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
                    For 
                    <em className="italic text-tag-misc-foreground block">Therapists</em>
                  </h2>
                  <p className="font-secondary text-2xl md:text-3xl text-text-secondary leading-[1.3] font-light">
                    Stand out by being yourself.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Content Column */}
                <div className="space-y-10">
                  <h3 className="font-primary text-3xl md:text-4xl font-bold text-text-primary">
                    Focus on what 
                    <em className="italic">matters</em>
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-6 bg-surface/50 p-6 rounded-xl">
                      <div className="w-4 h-4 bg-tag-personality rounded-full mt-2 flex-shrink-0"></div>
                      <p className="font-secondary text-xl text-text-secondary leading-relaxed">
                        Set your own rates, availability, and cancellation policy
                      </p>
                    </div>
                    <div className="flex items-start gap-6 bg-surface/50 p-6 rounded-xl">
                      <div className="w-4 h-4 bg-tag-modality rounded-full mt-2 flex-shrink-0"></div>
                      <p className="font-secondary text-xl text-text-secondary leading-relaxed">
                        Attract pre-qualified clients who value your unique style
                      </p>
                    </div>
                    <div className="flex items-start gap-6 bg-surface/50 p-6 rounded-xl">
                      <div className="w-4 h-4 bg-tag-specialty rounded-full mt-2 flex-shrink-0"></div>
                      <p className="font-secondary text-xl text-text-secondary leading-relaxed">
                        All-in-one scheduling, payouts, and simple admin
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Button size="lg" className="text-xl px-10 py-8 h-auto font-medium" asChild>
                      <Link to="/therapist">Join as Therapist</Link>
                    </Button>
                  </div>
                </div>

                {/* Images Column - Asymmetrical Grid */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3">
                    <img 
                      src="/images/therapist-black-female-40s.png"
                      alt="Experienced Black female therapist — calm and professional"
                      className="w-full h-auto rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-span-2 col-start-4 row-start-1 pt-8">
                    <img 
                      src="/images/therapist-white-nonbinary-30s.png"
                      alt="White nonbinary therapist in blazer — friendly and expressive"
                      className="w-full h-auto rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Social Proof Section - Editorial Testimonials */}
        <section className="py-24 md:py-32 bg-tag-specialty">
          <Container>
            <div className="space-y-16">
              {/* Section Header */}
              <div className="text-center space-y-8">
                <h2 className="font-primary text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
                  What our 
                  <em className="italic text-tag-specialty-foreground block">community says</em>
                </h2>
              </div>
              
              {/* Editorial Testimonial Carousel */}
              <div className="bg-surface/60 p-12 md:p-16 rounded-3xl">
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

        {/* Final CTA Section - Editorial Impact */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-tag-personality via-tag-modality to-tag-language relative overflow-hidden">
          <DecorativeShapes variant="abstract" className="opacity-30" />
          <Container>
            <div className="text-center space-y-16 relative z-10">
              <div className="max-w-5xl mx-auto space-y-10">
                <h2 className="font-primary text-5xl md:text-6xl lg:text-8xl font-bold text-text-primary leading-[0.9]">
                  Ready to find your 
                  <em className="italic text-jovial-jade block">therapist?</em>
                </h2>
                <p className="font-secondary text-2xl md:text-3xl text-text-secondary leading-[1.3] font-light max-w-3xl mx-auto">
                  Take our 3-minute quiz and start swiping through therapist profiles today.
                </p>
              </div>
              
              {/* Editorial CTA Layout */}
              <div className="bg-surface/80 backdrop-blur-sm p-12 md:p-16 rounded-3xl max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button size="lg" className="text-xl px-12 py-8 h-auto font-medium" asChild>
                    <Link to="/assessment">Start Your Journey</Link>
                  </Button>
                  <div className="text-text-secondary font-secondary text-lg">or</div>
                  <Button variant="outline" size="lg" className="text-xl px-12 py-8 h-auto font-medium border-2" asChild>
                    <Link to="/discover">Browse Therapists</Link>
                  </Button>
                </div>
                
                <div className="mt-8 pt-8 border-t border-text-primary/20">
                  <p className="font-secondary text-base text-text-muted font-medium tracking-wide">
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