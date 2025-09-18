import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TherapistLanding() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh overflow-x-hidden bg-warm-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="py-[var(--space-xl)] lg:py-[var(--space-2xl)]"
          style={{ backgroundColor: "hsl(var(--warning-bg))" }}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)] items-center">
              <div className="lg:col-span-6 space-y-[var(--space-md)]">
                <h1 
                  className="font-bold leading-tight"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-3xl)",
                    color: "hsl(var(--ink-slate))"
                  }}
                >
                  Finally, a platform that values who you are — not just what you do
                </h1>
                <p 
                  className="leading-relaxed max-w-2xl"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    fontSize: "var(--text-xl)",
                    color: "hsl(var(--text-primary))"
                  }}
                >
                  With personality-first matching and chemistry calls, every session starts with a real fit.
                </p>
                <div className="flex flex-col sm:flex-row gap-[var(--space-sm)]">
                  <Button
                    size="lg"
                    className="min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: "hsl(var(--btn-primary-bg))",
                      color: "hsl(var(--btn-primary-text))",
                      padding: "0 var(--space-lg)",
                    }}
                    asChild
                  >
                    <Link to="/signup?role=therapist">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: "transparent",
                      color: "hsl(var(--ink-slate))",
                      borderColor: "hsl(var(--ink-slate))",
                      padding: "0 var(--space-lg)",
                    }}
                    asChild
                  >
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <img
                  src="/images/therapist-black-female-40s.png"
                  alt="Professional therapist portrait with editorial illustration overlay"
                  className="w-full h-auto drop-shadow-lg"
                  style={{ borderRadius: "var(--radius-lg)" }}
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits Grid */}
        <section 
          className="py-[var(--space-xl)] lg:py-[var(--space-2xl)]"
          style={{ backgroundColor: "hsl(var(--warm-white))" }}
        >
          <Container>
            <div className="text-center mb-[var(--space-xl)]">
              <h2 
                className="font-bold mb-[var(--space-sm)]"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-3xl)",
                  color: "hsl(var(--jovial-jade))"
                }}
              >
                Why therapists choose Mindfolk
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)]">
              <div className="text-center space-y-[var(--space-sm)]">
                <img
                  src="/images/therapist-white-female-40s.png"
                  alt="Therapist setting up profile"
                  className="w-32 h-32 mx-auto object-cover drop-shadow-md"
                  style={{ borderRadius: "var(--radius-avatar)" }}
                  loading="lazy"
                />
                <h3 
                  className="font-semibold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-xl)",
                    color: "hsl(var(--jovial-jade))"
                  }}
                >
                  Personality-first matching
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    fontSize: "var(--text-base)",
                    color: "hsl(var(--text-secondary))"
                  }}
                >
                  Showcase your credentials, availability, and intro video to attract the right clients.
                </p>
              </div>
              
              <div className="text-center space-y-[var(--space-sm)]">
                <img
                  src="/images/therapist-asian-male-40s.png"
                  alt="Therapist with pre-qualified clients"
                  className="w-32 h-32 mx-auto object-cover drop-shadow-md"
                  style={{ borderRadius: "var(--radius-avatar)" }}
                  loading="lazy"
                />
                <h3 
                  className="font-semibold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-xl)",
                    color: "hsl(var(--jovial-jade))"
                  }}
                >
                  Pre-qualified clients
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    fontSize: "var(--text-base)",
                    color: "hsl(var(--text-secondary))"
                  }}
                >
                  Quick, safe pre-qualification calls ensure every client is genuinely interested.
                </p>
              </div>
              
              <div className="text-center space-y-[var(--space-sm)]">
                <img
                  src="/images/therapist-white-female-50s.png"
                  alt="Therapist using practice tools"
                  className="w-32 h-32 mx-auto object-cover drop-shadow-md"
                  style={{ borderRadius: "var(--radius-avatar)" }}
                  loading="lazy"
                />
                <h3 
                  className="font-semibold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-xl)",
                    color: "hsl(var(--jovial-jade))"
                  }}
                >
                  Practice in one place
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    fontSize: "var(--text-base)",
                    color: "hsl(var(--text-secondary))"
                  }}
                >
                  Scheduling, payouts, and analytics tools to streamline your practice.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section 
          id="how-it-works" 
          className="py-[var(--space-xl)] lg:py-[var(--space-2xl)]"
          style={{ backgroundColor: "hsl(var(--surface-accent))" }}
        >
          <Container>
            <div className="text-center mb-[var(--space-xl)]">
              <h2 
                className="font-bold mb-[var(--space-sm)]"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-3xl)",
                  color: "hsl(var(--jovial-jade))"
                }}
              >
                How it works
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-xl)] items-center">
              <div className="space-y-[var(--space-lg)]">
                <div className="flex gap-[var(--space-sm)]">
                  <div 
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[hsl(var(--on-dark))] font-bold"
                    style={{ 
                      backgroundColor: "hsl(var(--garden-green))",
                      borderRadius: "var(--radius-avatar)"
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-[var(--space-xs)]"
                      style={{ 
                        fontFamily: "var(--font-primary)",
                        fontSize: "var(--text-xl)",
                        color: "hsl(var(--jovial-jade))"
                      }}
                    >
                      Set up your profile
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ 
                        fontFamily: "var(--font-secondary)",
                        fontSize: "var(--text-base)",
                        color: "hsl(var(--text-secondary))"
                      }}
                    >
                      Add your credentials, availability, and record a 30-60 second intro video.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-[var(--space-sm)]">
                  <div 
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[hsl(var(--on-dark))] font-bold"
                    style={{ 
                      backgroundColor: "hsl(var(--garden-green))",
                      borderRadius: "var(--radius-avatar)"
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-[var(--space-xs)]"
                      style={{ 
                        fontFamily: "var(--font-primary)",
                        fontSize: "var(--text-xl)",
                        color: "hsl(var(--jovial-jade))"
                      }}
                    >
                      Start with chemistry calls
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ 
                        fontFamily: "var(--font-secondary)",
                        fontSize: "var(--text-base)",
                        color: "hsl(var(--text-secondary))"
                      }}
                    >
                      15-minute pre-qualification calls to ensure mutual fit before full sessions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-[var(--space-sm)]">
                  <div 
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[hsl(var(--on-dark))] font-bold"
                    style={{ 
                      backgroundColor: "hsl(var(--garden-green))",
                      borderRadius: "var(--radius-avatar)"
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h3 
                      className="font-semibold mb-[var(--space-xs)]"
                      style={{ 
                        fontFamily: "var(--font-primary)",
                        fontSize: "var(--text-xl)",
                        color: "hsl(var(--jovial-jade))"
                      }}
                    >
                      Go live
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{ 
                        fontFamily: "var(--font-secondary)",
                        fontSize: "var(--text-base)",
                        color: "hsl(var(--text-secondary))"
                      }}
                    >
                      Start full sessions after verification and chemistry call success.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <img
                  src="/images/therapist-white-nonbinary-30s.png"
                  alt="Friendly therapist ready to connect with clients"
                  className="w-80 h-auto mx-auto drop-shadow-md"
                  style={{ borderRadius: "var(--radius-lg)" }}
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing */}
        <section 
          className="py-[var(--space-xl)] lg:py-[var(--space-2xl)]"
          style={{ backgroundColor: "hsl(var(--warm-white))" }}
        >
          <Container>
            <div className="text-center mb-[var(--space-xl)]">
              <h2 
                className="font-bold mb-[var(--space-sm)]"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-3xl)",
                  color: "hsl(var(--jovial-jade))"
                }}
              >
                Simple, transparent pricing
              </h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <div 
                className="p-[var(--space-lg)] shadow-lg border"
                style={{ 
                  backgroundColor: "hsl(var(--surface))",
                  borderRadius: "var(--radius-lg)"
                }}
              >
                <div className="text-center mb-[var(--space-md)]">
                  <h3 
                    className="font-bold mb-[var(--space-xs)]"
                    style={{ 
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-2xl)",
                      color: "hsl(var(--jovial-jade))"
                    }}
                  >
                    Therapist Subscription
                  </h3>
                  <div 
                    className="font-bold mb-[var(--space-xs)]" 
                    style={{ 
                      fontSize: "var(--text-3xl)",
                      color: "hsl(var(--garden-green))" 
                    }}
                  >
                    £19.50<span style={{ fontSize: "var(--text-base)", fontWeight: "normal" }}>/month</span>
                  </div>
                  <p 
                    style={{ 
                      fontSize: "var(--text-sm)",
                      color: "hsl(var(--text-secondary))" 
                    }}
                  >
                    7-day free trial
                  </p>
                </div>
                
                <ul className="space-y-[var(--space-xs)] mb-[var(--space-md)]">
                  <li 
                    className="flex items-center gap-[var(--space-xs)]"
                    style={{ color: "hsl(var(--text-secondary))" }}
                  >
                    <div 
                      className="w-4 h-4 flex-shrink-0"
                      style={{ 
                        backgroundColor: "hsl(var(--garden-green))",
                        borderRadius: "var(--radius-avatar)"
                      }}
                    ></div>
                    Platform fee: 15% per session
                  </li>
                  <li 
                    className="flex items-center gap-[var(--space-xs)]"
                    style={{ color: "hsl(var(--text-secondary))" }}
                  >
                    <div 
                      className="w-4 h-4 flex-shrink-0"
                      style={{ 
                        backgroundColor: "hsl(var(--garden-green))",
                        borderRadius: "var(--radius-avatar)"
                      }}
                    ></div>
                    Weekly payouts via Stripe Connect
                  </li>
                  <li 
                    className="flex items-center gap-[var(--space-xs)]"
                    style={{ color: "hsl(var(--text-secondary))" }}
                  >
                    <div 
                      className="w-4 h-4 flex-shrink-0"
                      style={{ 
                        backgroundColor: "hsl(var(--garden-green))",
                        borderRadius: "var(--radius-avatar)"
                      }}
                    ></div>
                    You keep 85% of session fees
                  </li>
                </ul>
                
                <Button
                  size="lg"
                  className="w-full min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: "hsl(var(--btn-primary-bg))",
                    color: "hsl(var(--btn-primary-text))",
                  }}
                  asChild
                >
                  <Link to="/signup?role=therapist">Start 7-Day Free Trial</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section 
          className="py-[var(--space-xl)] lg:py-[var(--space-2xl)]"
          style={{ backgroundColor: "hsl(var(--btn-accent-bg))" }}
        >
          <Container>
            <div className="text-center space-y-[var(--space-md)]">
              <h2 
                className="font-bold"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-3xl)",
                  color: "hsl(var(--jovial-jade))"
                }}
              >
                Ready to meet clients who actually fit your style?
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-[var(--space-sm)]">
                <Button
                  size="lg"
                  className="min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: "hsl(var(--btn-primary-bg))",
                    color: "hsl(var(--btn-primary-text))",
                    padding: "0 var(--space-lg)",
                  }}
                  asChild
                >
                  <Link to="/signup?role=therapist">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-[var(--touch-target-min)] focus-visible:ring-2 focus-visible:ring-[var(--garden-green)] focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "hsl(var(--btn-secondary-text))",
                    borderColor: "hsl(var(--garden-green))",
                    padding: "0 var(--space-lg)",
                  }}
                  asChild
                >
                  <Link to="/t/dashboard">Sign In</Link>
                </Button>
              </div>
              
              <div className="pt-4">
                <img
                  src="/images/hero-mix.png"
                  alt="Diverse therapists and clients connecting"
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
