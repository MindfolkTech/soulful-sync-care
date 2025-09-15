import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { EditorialOverlay } from "@/components/ui/editorial-overlay";
import { CheckCircle, Play, CreditCard, Users, Heart, Eye, Clock, Shield } from "lucide-react";
import heroTherapist from "@/assets/hero-therapist.jpg";
import testimonialPortrait from "@/assets/testimonial-portrait.jpg";
import benefitConfidence from "@/assets/benefit-confidence.jpg";
import benefitPay from "@/assets/benefit-pay.jpg";
import benefitCall from "@/assets/benefit-call.jpg";
import benefitDiversity from "@/assets/benefit-diversity.jpg";
import profileSample from "@/assets/profile-sample.jpg";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Editorial Split Layout */}
        <section 
          className="py-20 lg:py-32 relative overflow-hidden"
          style={{ backgroundColor: "hsl(var(--peach-light))" }}
        >
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <h1 className="font-primary text-4xl lg:text-6xl font-bold leading-tight" style={{ color: "hsl(var(--text-primary))" }}>
                  Find a therapist who truly gets you.
                </h1>
                <p className="font-secondary text-xl leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                  Choose from therapists who match your personality, culture, and needs — with free chemistry calls before committing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="px-8" asChild>
                    <Link to="/browse">Find a Therapist</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="px-8" asChild>
                    <Link to="#how-it-works">See How It Works</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <EditorialOverlay
                  src={heroTherapist}
                  alt="Therapist portrait with editorial overlay"
                  overlayRule="personality:warm"
                  className="w-full h-96 lg:h-[500px]"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Compatibility Stats Section */}
        <section className="py-20 lg:py-24" style={{ backgroundColor: "hsl(var(--warm-white))" }}>
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                Comfort comes first.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat Cards */}
              <Card className="text-center p-8 border-0" style={{ backgroundColor: "hsl(var(--soft-blue))" }}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    97%
                  </div>
                  <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    say relationship quality is the most important factor in therapy.
                  </p>
                  <svg className="w-full h-8" aria-hidden="true">
                    <use href="#line-ul" stroke="hsl(var(--elated-emerald))" fill="none" strokeWidth={2} />
                  </svg>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-0" style={{ backgroundColor: "hsl(var(--soft-blush))" }}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    83%
                  </div>
                  <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    said finding compatibility info is difficult.
                  </p>
                  <svg className="w-full h-8" aria-hidden="true">
                    <use href="#line-wave" stroke="hsl(var(--elated-emerald))" fill="none" strokeWidth={2} />
                  </svg>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-0" style={{ backgroundColor: "hsl(var(--soft-sage))" }}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    84%
                  </div>
                  <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    believe a 30-second video helps assess fit.
                  </p>
                  <svg className="w-full h-8" aria-hidden="true">
                    <use href="#line-spark" stroke="hsl(var(--elated-emerald))" fill="none" strokeWidth={2} />
                  </svg>
                </CardContent>
              </Card>

              {/* Testimonial Card */}
              <Card className="p-8 border-0" style={{ backgroundColor: "hsl(var(--soft-sage))" }}>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <EditorialOverlay
                      src={testimonialPortrait}
                      alt="Survey participant portrait"
                      overlayRule="affinity:multilingual"
                      className="w-20 h-20 mx-auto"
                    />
                  </div>
                  <blockquote className="font-secondary text-sm italic leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    "Looking back on the therapists I've tried, the biggest thing is knowing they're my kind of person."
                  </blockquote>
                  <cite className="font-secondary text-xs" style={{ color: "hsl(var(--text-secondary))" }}>
                    Survey participant, 18–24 (nonbinary, bisexual)
                  </cite>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section 
          id="how-it-works" 
          className="py-20 lg:py-24"
          style={{ backgroundColor: "hsl(var(--surface-accent))" }}
        >
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-6">
                <div className="relative mx-auto w-24 h-24">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--soft-sage))" }}
                  >
                    <Eye className="w-10 h-10" style={{ color: "hsl(var(--text-primary))" }} />
                  </div>
                  <svg className="absolute inset-0" aria-hidden="true">
                    <use href="#fill-oval" fill="hsl(var(--soft-sage))" opacity="0.3" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="font-primary text-2xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    Browse profiles
                  </h3>
                  <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    Intro video, audio, or photos plus clear credentials and specialties.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="relative mx-auto w-24 h-24">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--soft-blush))" }}
                  >
                    <Heart className="w-10 h-10" style={{ color: "hsl(var(--text-primary))" }} />
                  </div>
                  <svg className="absolute inset-0" aria-hidden="true">
                    <use href="#fill-blobby" fill="hsl(var(--soft-blush))" opacity="0.3" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="font-primary text-2xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    Book a free chemistry call
                  </h3>
                  <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    15 minutes to check comfort and fit.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="relative mx-auto w-24 h-24">
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--soft-blue))" }}
                  >
                    <CreditCard className="w-10 h-10" style={{ color: "hsl(var(--text-primary))" }} />
                  </div>
                  <svg className="absolute inset-0" aria-hidden="true">
                    <use href="#fill-arch" fill="hsl(var(--soft-blue))" opacity="0.3" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="font-primary text-2xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    Only pay for sessions you choose
                  </h3>
                  <p className="font-secondary leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                    No subscriptions. Therapist-set rates & policies.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-24" style={{ backgroundColor: "hsl(var(--warm-white))" }}>
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                Why choose Mindfolk?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <EditorialOverlay
                    src={benefitConfidence}
                    alt="Confidence illustration"
                    overlayRule="personality:warm"
                    className="w-full h-48"
                  />
                  <div className="space-y-3">
                    <h3 className="font-primary text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                      Confidence from the start
                    </h3>
                    <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                      See therapists' style and personality before booking.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <EditorialOverlay
                    src={benefitPay}
                    alt="Payment illustration"
                    overlayRule="personality:direct"
                    className="w-full h-48"
                  />
                  <div className="space-y-3">
                    <h3 className="font-primary text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                      Only pay for what you use
                    </h3>
                    <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                      Pay-per-session with transparent, therapist-set rates.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <EditorialOverlay
                    src={benefitCall}
                    alt="Free calls illustration"
                    overlayRule="personality:calm"
                    className="w-full h-48"
                  />
                  <div className="space-y-3">
                    <h3 className="font-primary text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                      Free trial calls
                    </h3>
                    <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                      15-minute chemistry calls with every therapist.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <EditorialOverlay
                    src={benefitDiversity}
                    alt="Diversity illustration"
                    overlayRule="affinity:multilingual"
                    className="w-full h-48"
                  />
                  <div className="space-y-3">
                    <h3 className="font-primary text-xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                      Flexibility & diversity
                    </h3>
                    <p className="font-secondary text-sm leading-relaxed" style={{ color: "hsl(var(--text-body))" }}>
                      Find LGBT+ affirming, neurodivergence-aware, trauma specialists and culturally aligned therapists.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Social Proof Section */}
        <section 
          className="py-16 lg:py-20"
          style={{ backgroundColor: "hsl(var(--soft-lavender))" }}
        >
          <Container>
            <div className="text-center space-y-8">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <div className="text-5xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    87%
                  </div>
                  <p className="font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                    say free trial sessions save time and money.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-primary font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                    95%
                  </div>
                  <p className="font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                    prefer pay-per-session over subscriptions.
                  </p>
                </div>
              </div>
              
              <Button size="lg" className="px-8" asChild>
                <Link to="/browse">Find a Therapist</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Transparency Section */}
        <section className="py-20 lg:py-24" style={{ backgroundColor: "hsl(var(--warm-white))" }}>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <h2 className="font-primary text-3xl lg:text-4xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                  Clear credentials, clear pricing, clear policies.
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "hsl(var(--garden-green))" }} />
                    <p className="font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                      Verified therapist registrations.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "hsl(var(--garden-green))" }} />
                    <p className="font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                      No hidden fees — therapists set rates & cancellation policies.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "hsl(var(--garden-green))" }} />
                    <p className="font-secondary" style={{ color: "hsl(var(--text-body))" }}>
                      Easy-to-read profiles with specialties and qualifications.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <EditorialOverlay
                  src={profileSample}
                  alt="Sample therapist profile with credentials"
                  overlayRule="personality:calm"
                  className="w-full h-96"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Education/Resources Section */}
        <section 
          className="py-20 lg:py-24"
          style={{ backgroundColor: "hsl(var(--soft-blush))" }}
        >
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-3xl lg:text-4xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                Learn more
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium px-3 py-1 rounded-full inline-block" style={{ backgroundColor: "hsl(var(--soft-sage))", color: "hsl(var(--text-primary))" }}>
                    Guide
                  </div>
                  <h3 className="font-primary text-xl font-semibold" style={{ color: "hsl(var(--text-primary))" }}>
                    How to know if a therapist is right for you
                  </h3>
                  <Link 
                    to="/resources/right-fit" 
                    className="font-secondary text-sm inline-flex items-center space-x-1 hover:underline" 
                    style={{ color: "hsl(var(--text-body))" }}
                  >
                    <span>Read more</span>
                    <span>→</span>
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium px-3 py-1 rounded-full inline-block" style={{ backgroundColor: "hsl(var(--soft-blue))", color: "hsl(var(--text-primary))" }}>
                    Research
                  </div>
                  <h3 className="font-primary text-xl font-semibold" style={{ color: "hsl(var(--text-primary))" }}>
                    What clients value most in therapy
                  </h3>
                  <Link 
                    to="/resources/client-values" 
                    className="font-secondary text-sm inline-flex items-center space-x-1 hover:underline" 
                    style={{ color: "hsl(var(--text-body))" }}
                  >
                    <span>Read more</span>
                    <span>→</span>
                  </Link>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium px-3 py-1 rounded-full inline-block" style={{ backgroundColor: "hsl(var(--soft-lavender))", color: "hsl(var(--text-primary))" }}>
                    Tips
                  </div>
                  <h3 className="font-primary text-xl font-semibold" style={{ color: "hsl(var(--text-primary))" }}>
                    Tips for making the most of your first session
                  </h3>
                  <Link 
                    to="/resources/first-session" 
                    className="font-secondary text-sm inline-flex items-center space-x-1 hover:underline" 
                    style={{ color: "hsl(var(--text-body))" }}
                  >
                    <span>Read more</span>
                    <span>→</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Therapist CTA Section */}
        <section 
          className="py-16 lg:py-20"
          style={{ backgroundColor: "hsl(var(--soft-sage))" }}
        >
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-primary text-3xl lg:text-4xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                Are you a therapist?
              </h2>
              <p className="font-secondary text-lg" style={{ color: "hsl(var(--text-body))" }}>
                Join Mindfolk to reach clients who value your style — and keep control of your practice.
              </p>
              <Button variant="outline" size="lg" className="px-8" asChild>
                <Link to="/therapist">For Therapists</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section 
          className="py-20 lg:py-24"
          style={{ backgroundColor: "hsl(var(--peach-light))" }}
        >
          <Container>
            <div className="text-center space-y-8">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold" style={{ color: "hsl(var(--text-primary))" }}>
                Ready to start therapy that feels like a fit?
              </h2>
              <Button size="lg" className="px-8" asChild>
                <Link to="/browse">Find a Therapist</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}