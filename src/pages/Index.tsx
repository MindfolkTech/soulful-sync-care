import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent } from "@/components/ui/card";
import { EditorialOverlay } from "@/components/ui/editorial-overlay";
import { Video, Heart, Shield, Users, CheckCircle, Star, ArrowRight } from "lucide-react";
import heroTherapist from "@/assets/hero-therapist.jpg";
import testimonialPortrait from "@/assets/testimonial-portrait.jpg";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--peach-light))" }}>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-primary text-3xl lg:text-5xl font-bold text-text-primary leading-tight">
                  Find a therapist who truly gets you.
                </h1>
                <p className="font-secondary text-lg text-text-secondary leading-relaxed">
                  Choose from therapists who match your personality, culture, and needs — with free chemistry calls before committing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="min-h-touch-comfort px-8" asChild>
                    <Link to="/assessment">Find a Therapist</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="min-h-touch-comfort px-8" asChild>
                    <Link to="#how-it-works">See How It Works <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <EditorialOverlay
                  src={heroTherapist}
                  alt="Therapist portrait framed by soft editorial overlays"
                  className="w-80 h-80 lg:w-96 lg:h-96"
                  overlayRule="personality:warm"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Comfort Comes First Section */}
        <section className="py-16 lg:py-20 bg-background">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary mb-4">
                Comfort comes first.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat Cards */}
              <Card className="text-center p-6" style={{ backgroundColor: "hsl(var(--soft-blue))" }}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-primary font-bold text-text-primary">97%</div>
                  <p className="font-secondary text-sm text-text-secondary">
                    say relationship quality is the most important factor in therapy.
                  </p>
                  <div className="h-1" style={{ backgroundColor: "hsl(var(--elated-emerald))" }} />
                </CardContent>
              </Card>

              <Card className="text-center p-6" style={{ backgroundColor: "hsl(var(--soft-blush))" }}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-primary font-bold text-text-primary">83%</div>
                  <p className="font-secondary text-sm text-text-secondary">
                    said finding compatibility info is difficult.
                  </p>
                  <div className="h-1" style={{ backgroundColor: "hsl(var(--elated-emerald))" }} />
                </CardContent>
              </Card>

              <Card className="text-center p-6" style={{ backgroundColor: "hsl(var(--soft-sage))" }}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-primary font-bold text-text-primary">84%</div>
                  <p className="font-secondary text-sm text-text-secondary">
                    believe a 30-second video helps assess fit.
                  </p>
                  <div className="h-1" style={{ backgroundColor: "hsl(var(--elated-emerald))" }} />
                </CardContent>
              </Card>

              {/* Quote Card */}
              <Card className="p-6" style={{ backgroundColor: "hsl(var(--soft-sage))" }}>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <EditorialOverlay
                      src={testimonialPortrait}
                      alt="Survey participant portrait"
                      className="w-16 h-16 flex-shrink-0"
                      overlayRule="affinity:multilingual"
                    />
                    <div>
                      <blockquote className="font-secondary text-sm text-text-primary italic">
                        "Looking back on the therapists I've tried, the biggest thing is knowing they're my kind of person."
                      </blockquote>
                      <cite className="font-secondary text-xs text-text-secondary mt-2 block">
                        Survey participant, 18–24 (nonbinary, bisexual)
                      </cite>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--surface-accent))" }}>
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <div className="w-20 h-20 mx-auto">
                    <EditorialOverlay
                      src={testimonialPortrait}
                      alt="Browse profiles step"
                      className="w-full h-full"
                      overlayRule="personality:calm"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-secondary text-text-secondary mb-2">Step 1</div>
                    <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                      Browse profiles
                    </h3>
                    <p className="font-secondary text-text-secondary">
                      Intro video, audio, or photos plus clear credentials and specialties.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <div className="w-20 h-20 mx-auto">
                    <EditorialOverlay
                      src={testimonialPortrait}
                      alt="Chemistry call step"
                      className="w-full h-full"
                      overlayRule="personality:warm"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-secondary text-text-secondary mb-2">Step 2</div>
                    <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                      Book a free chemistry call
                    </h3>
                    <p className="font-secondary text-text-secondary">
                      15 minutes to check comfort and fit.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-0 shadow-sm">
                <CardContent className="space-y-6">
                  <div className="w-20 h-20 mx-auto">
                    <EditorialOverlay
                      src={testimonialPortrait}
                      alt="Pay per session step"
                      className="w-full h-full"
                      overlayRule="personality:direct"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-secondary text-text-secondary mb-2">Step 3</div>
                    <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                      Only pay for sessions you choose
                    </h3>
                    <p className="font-secondary text-text-secondary">
                      No subscriptions. Therapist-set rates & policies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Why Choose MindFolk Section */}
        <section className="py-16 lg:py-20 bg-background">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                Why choose MindFolk?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <EditorialOverlay
                    src={testimonialPortrait}
                    alt="Portrait with peach overlay"
                    className="w-full h-32 mb-4"
                    overlayRule="personality:warm"
                  />
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    Confidence from the start
                  </h3>
                  <p className="font-secondary text-sm text-text-secondary">
                    See therapists' style and personality before booking.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <EditorialOverlay
                    src={testimonialPortrait}
                    alt="Wallet UI"
                    className="w-full h-32 mb-4"
                    overlayRule="personality:direct"
                  />
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    Only pay for what you use
                  </h3>
                  <p className="font-secondary text-sm text-text-secondary">
                    Pay-per-session with transparent, therapist-set rates.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <EditorialOverlay
                    src={testimonialPortrait}
                    alt="Call icon with overlay"
                    className="w-full h-32 mb-4"
                    overlayRule="personality:calm"
                  />
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    Free trial calls
                  </h3>
                  <p className="font-secondary text-sm text-text-secondary">
                    15-minute chemistry calls with every therapist.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <EditorialOverlay
                    src={testimonialPortrait}
                    alt="Diverse portraits"
                    className="w-full h-32 mb-4"
                    overlayRule="affinity:multilingual"
                  />
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    Flexibility & diversity
                  </h3>
                  <p className="font-secondary text-sm text-text-secondary">
                    Find LGBT+ affirming, neurodivergence-aware, trauma specialists and culturally aligned therapists.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--soft-lavender))" }}>
          <Container>
            <div className="text-center space-y-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-4xl lg:text-5xl font-primary font-bold text-text-primary mb-2">87%</div>
                  <p className="font-secondary text-text-secondary">say free trial sessions save time and money.</p>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-primary font-bold text-text-primary mb-2">95%</div>
                  <p className="font-secondary text-text-secondary">prefer pay-per-session over subscriptions.</p>
                </div>
              </div>
              
              <Button size="lg" className="min-h-touch-comfort px-8" asChild>
                <Link to="/assessment">Find a Therapist</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Transparency Section */}
        <section className="py-16 lg:py-20 bg-background">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                  Clear credentials, clear pricing, clear policies.
                </h2>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-secondary text-text-secondary">Verified therapist registrations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-secondary text-text-secondary">No hidden fees — therapists set rates & cancellation policies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="font-secondary text-text-secondary">Easy-to-read profiles with specialties and qualifications.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <EditorialOverlay
                  src={testimonialPortrait}
                  alt="Sample therapist profile with credentials and rate"
                  className="w-80 h-80"
                  overlayRule="personality:calm"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Learn More Section */}
        <section className="py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--soft-blush))" }}>
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                Learn more
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-xs font-secondary text-text-secondary bg-tag-specialty text-tag-specialty-foreground px-2 py-1 rounded-md w-fit">
                    Guide
                  </div>
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    How to know if a therapist is right for you
                  </h3>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-secondary text-sm" asChild>
                    <Link to="/resources/right-fit">Read more <ArrowRight className="w-3 h-3 ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-xs font-secondary text-text-secondary bg-tag-modality text-tag-modality-foreground px-2 py-1 rounded-md w-fit">
                    Research
                  </div>
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    What clients value most in therapy
                  </h3>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-secondary text-sm" asChild>
                    <Link to="/resources/client-values">Read more <ArrowRight className="w-3 h-3 ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="text-xs font-secondary text-text-secondary bg-tag-personality text-tag-personality-foreground px-2 py-1 rounded-md w-fit">
                    Tips
                  </div>
                  <h3 className="font-primary text-lg font-semibold text-text-primary">
                    Tips for making the most of your first session
                  </h3>
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-secondary text-sm" asChild>
                    <Link to="/resources/first-session">Read more <ArrowRight className="w-3 h-3 ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Therapist Path Section */}
        <section className="py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--soft-sage))" }}>
          <Container>
            <div className="text-center space-y-6">
              <h2 className="font-primary text-2xl lg:text-3xl font-bold text-text-primary">
                Are you a therapist?
              </h2>
              <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
                Join MindFolk to reach clients who value your style — and keep control of your practice.
              </p>
              
              <Button variant="outline" size="lg" className="min-h-touch-comfort px-8" asChild>
                <Link to="/therapist">For Therapists</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--peach-light))" }}>
          <Container>
            <div className="text-center space-y-6">
              <h2 className="font-primary text-2xl lg:text-3xl font-bold text-text-primary">
                Ready to start therapy that feels like a fit?
              </h2>
              
              <Button size="lg" className="min-h-touch-comfort px-8" asChild>
                <Link to="/assessment">Find a Therapist</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}