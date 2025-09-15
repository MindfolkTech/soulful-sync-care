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
        <section style={{ backgroundColor: "#fa9981" }} className="py-16 lg:py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  Finally, a platform that values who you are — not just what you do
                </h1>
                <p 
                  className="text-xl text-white/90 leading-relaxed max-w-2xl"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  With personality-first matching and chemistry calls, every session starts with a real fit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: "var(--btn-primary-bg)",
                      color: "var(--btn-primary-text)",
                    }}
                    asChild
                  >
                    <Link to="/therapist/signup">Get Started</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      borderColor: "white",
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
                  loading="eager"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--warm-white)" }}>
          <Container>
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)"
                }}
              >
                Why therapists choose Mindfolk
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <img
                  src="/images/therapist-white-female-40s.png"
                  alt="Therapist setting up profile"
                  className="w-32 h-32 mx-auto rounded-full object-cover drop-shadow-md"
                  loading="lazy"
                />
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                >
                  Personality-first matching
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-secondary)"
                  }}
                >
                  Showcase your credentials, availability, and intro video to attract the right clients.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <img
                  src="/images/therapist-asian-male-40s.png"
                  alt="Therapist with pre-qualified clients"
                  className="w-32 h-32 mx-auto rounded-full object-cover drop-shadow-md"
                  loading="lazy"
                />
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                >
                  Pre-qualified clients
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-secondary)"
                  }}
                >
                  Quick, safe pre-qualification calls ensure every client is genuinely interested.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <img
                  src="/images/therapist-white-female-50s.png"
                  alt="Therapist using practice tools"
                  className="w-32 h-32 mx-auto rounded-full object-cover drop-shadow-md"
                  loading="lazy"
                />
                <h3 
                  className="text-xl font-semibold"
                  style={{ 
                    fontFamily: "var(--font-primary)",
                    color: "var(--jovial-jade)"
                  }}
                >
                  Practice in one place
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ 
                    fontFamily: "var(--font-secondary)",
                    color: "var(--text-secondary)"
                  }}
                >
                  Scheduling, payouts, and analytics tools to streamline your practice.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 lg:py-24" style={{ backgroundColor: "var(--surface-accent)" }}>
          <Container>
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)"
                }}
              >
                How it works
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    1
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ 
                        fontFamily: "var(--font-primary)",
                        color: "var(--jovial-jade)"
                      }}
                    >
                      Set up your profile
                    </h3>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ 
                        fontFamily: "var(--font-secondary)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      Add your credentials, availability, and record a 30-60 second intro video.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    2
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ 
                        fontFamily: "var(--font-primary)",
                        color: "var(--jovial-jade)"
                      }}
                    >
                      Start with chemistry calls
                    </h3>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ 
                        fontFamily: "var(--font-secondary)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      15-minute pre-qualification calls to ensure mutual fit before full sessions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "var(--garden-green)" }}
                  >
                    3
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ 
                        fontFamily: "var(--font-primary)",
                        color: "var(--jovial-jade)"
                      }}
                    >
                      Go live
                    </h3>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ 
                        fontFamily: "var(--font-secondary)",
                        color: "var(--text-secondary)"
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
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing */}
        <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--warm-white)" }}>
          <Container>
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)"
                }}
              >
                Simple, transparent pricing
              </h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <div 
                className="p-8 rounded-lg shadow-lg border"
                style={{ backgroundColor: "var(--surface)" }}
              >
                <div className="text-center mb-6">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ 
                      fontFamily: "var(--font-primary)",
                      color: "var(--jovial-jade)"
                    }}
                  >
                    Therapist Subscription
                  </h3>
                  <div className="text-3xl font-bold mb-2" style={{ color: "var(--garden-green)" }}>
                    £19.50<span className="text-base font-normal">/month</span>
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    7-day free trial
                  </p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li 
                    className="flex items-center gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--garden-green)" }}
                    ></div>
                    Platform fee: 15% per session
                  </li>
                  <li 
                    className="flex items-center gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--garden-green)" }}
                    ></div>
                    Weekly payouts via Stripe Connect
                  </li>
                  <li 
                    className="flex items-center gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--garden-green)" }}
                    ></div>
                    You keep 85% of session fees
                  </li>
                </ul>
                
                <Button
                  size="lg"
                  className="w-full"
                  style={{
                    backgroundColor: "var(--btn-primary-bg)",
                    color: "var(--btn-primary-text)",
                  }}
                  asChild
                >
                  <Link to="/therapist/signup">Start 7-Day Free Trial</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24" style={{ backgroundColor: "#ffd9be" }}>
          <Container>
            <div className="text-center space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ 
                  fontFamily: "var(--font-primary)",
                  color: "var(--jovial-jade)"
                }}
              >
                Ready to meet clients who actually fit your style?
              </h2>
              
              <Button
                size="lg"
                style={{
                  backgroundColor: "var(--btn-primary-bg)",
                  color: "var(--btn-primary-text)",
                }}
                asChild
              >
                <Link to="/therapist/signup">Get Started</Link>
              </Button>
              
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