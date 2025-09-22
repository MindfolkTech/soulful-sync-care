import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/ui/page-shell";
import { Clock, Wallet, Frown, CheckCircle, Star, Shield } from "lucide-react";

export default function Index() {
  return (
    <PageShell>
        {/* 1. Hero Section - The "Aha!" Moment */}
        <section 
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--warm-white))" }}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-center">
              <div className="lg:col-span-6 space-y-md">
                <h1 
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "hsl(var(--text-primary))",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  }}
                >
                  Find a therapist who actually <em className="italic" style={{ color: "hsl(var(--garden-green))" }}>gets you</em>.
                </h1>
                
                <p 
                  className="leading-relaxed text-lg"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "hsl(var(--text-secondary))",
                  }}
                >
                  Stop scrolling through therapist directories. Swipe through short, authentic videos to find a fit that clicks.
                </p>
                
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="text-lg px-[var(--space-lg)] py-[var(--space-md)] min-h-touch-comfort"
                    style={{
                      backgroundColor: "hsl(var(--garden-green))",
                      color: "hsl(var(--btn-primary-text))",
                      fontFamily: "var(--font-secondary)",
                      fontWeight: "600",
                    }}
                    asChild
                  >
                    <Link to="/sign-up?role=client">Start Matching for Free</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative">
                  <img
                    src="/images/hero-mix.png"
                    alt="Diverse, warm, approachable therapist faces in a swipe interface showing authentic video profiles"
                    className="w-full h-auto drop-shadow-lg"
                    style={{ borderRadius: "var(--radius-lg)" }}
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. The Problem - "We Understand the Struggle" */}
        <section 
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--surface))" }}
        >
          <Container>
            <div className="text-center space-y-lg">
              <h2 
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "hsl(var(--text-primary))",
                }}
              >
                The old way of finding a therapist is broken.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] mt-[var(--space-xl)]">
                <div className="text-center space-y-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--surface-accent))" }}
                  >
                    <Clock className="w-8 h-8" style={{ color: "hsl(var(--text-secondary))" }} />
                  </div>
                  <h3 
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    Wasted Time
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-secondary))",
                    }}
                  >
                    Endless scrolling through text-heavy directories.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--surface-accent))" }}
                  >
                    <Wallet className="w-8 h-8" style={{ color: "hsl(var(--text-secondary))" }} />
                  </div>
                  <h3 
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    Financial Drain
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-secondary))",
                    }}
                  >
                    Paying for initial sessions that go nowhere.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "hsl(var(--surface-accent))" }}
                  >
                    <Frown className="w-8 h-8" style={{ color: "hsl(var(--text-secondary))" }} />
                  </div>
                  <h3 
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    Mental Exhaustion
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-secondary))",
                    }}
                  >
                    Re-explaining yourself to therapist-after-therapist over and over again.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. The Solution - "Here's a Better Way" */}
        <section 
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--surface-accent))" }}
        >
          <Container>
            <div className="text-center space-y-lg">
              <h2 
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "hsl(var(--text-primary))",
                }}
              >
                You are a person. Not a <em className="italic">patient</em>.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] mt-[var(--space-xl)]">
                <div className="space-y-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ 
                      backgroundColor: "hsl(var(--garden-green))",
                      color: "hsl(var(--btn-primary-text))",
                      fontFamily: "var(--font-secondary)"
                    }}
                  >
                    1
                  </div>
                  <div className="space-y-4">
                    <h3 
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      Watch & Swipe
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-secondary))",
                      }}
                    >
                      Get a real feel for a therapist's personality with short video intros. See who you vibe with.
                    </p>
                  </div>
                  <img 
                    src="/images/client-white-female-autistic-20s.png"
                    alt="Young woman engaging with video profiles on mobile app"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                
                <div className="space-y-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ 
                      backgroundColor: "hsl(var(--garden-green))",
                      color: "hsl(var(--btn-primary-text))",
                      fontFamily: "var(--font-secondary)"
                    }}
                  >
                    2
                  </div>
                  <div className="space-y-4">
                    <h3 
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      Chat & Check
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-secondary))",
                      }}
                    >
                      Book a free 15-minute chemistry call with your favs. No commitment.
                    </p>
                  </div>
                  <img 
                    src="/images/therapist-white-female-20s.png"
                    alt="Young therapist in friendly video call"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                
                <div className="space-y-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto"
                    style={{ 
                      backgroundColor: "hsl(var(--garden-green))",
                      color: "hsl(var(--btn-primary-text))",
                      fontFamily: "var(--font-secondary)"
                    }}
                  >
                    3
                  </div>
                  <div className="space-y-4">
                    <h3 
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      Book with Confidence
                    </h3>
                    <p 
                      className="leading-relaxed"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-secondary))",
                      }}
                    >
                      Start your therapy journey knowing you've already made a genuine connection.
                    </p>
                  </div>
                  <img 
                    src="/images/client-white-male-20s-lilac-shirt.png"
                    alt="Young man looking hopeful and confident"
                    className="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. The People - "Meet Our Folk" */}
        <section 
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--surface))" }}
        >
          <Container>
            <div className="text-center space-y-lg">
              <h2 
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "hsl(var(--text-primary))",
                }}
              >
                Real Therapists, Real Personalities.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-md)] mt-[var(--space-xl)]">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src="/images/therapist-black-female-40s.png"
                      alt="Therapist video profile - warm and approachable Black therapist"
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      Maya
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-specialty-bg))",
                          color: "hsl(var(--tag-specialty-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        Neurodiversity Affirming
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-personality-bg))",
                          color: "hsl(var(--tag-personality-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        LGBTQ+ Advocate
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src="/images/therapist-white-female-40s.png"
                      alt="Therapist video profile - experienced white female therapist"
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      Sarah
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-specialty-bg))",
                          color: "hsl(var(--tag-specialty-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        Life Transitions
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-modality-bg))",
                          color: "hsl(var(--tag-modality-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        CBT
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src="/images/therapist-white-nonbinary-30s.png"
                      alt="Therapist video profile - welcoming non-binary therapist"
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      Alex
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-personality-bg))",
                          color: "hsl(var(--tag-personality-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        Gender Affirming
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-specialty-bg))",
                          color: "hsl(var(--tag-specialty-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        Trauma Informed
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src="/images/therapist-asian-male-40s.png"
                      alt="Therapist video profile - calm and reassuring Asian male therapist"
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "var(--font-secondary)",
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      David
                    </h3>
                    <div className="flex flex-wrap gap-1 justify-center">
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-modality-bg))",
                          color: "hsl(var(--tag-modality-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        Mindfulness
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs min-h-touch-min"
                        style={{
                          backgroundColor: "hsl(var(--tag-specialty-bg))",
                          color: "hsl(var(--tag-specialty-text))",
                          fontFamily: "var(--font-secondary)"
                        }}
                      >
                        Anxiety Specialist
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="lg"
                className="mt-8"
                style={{
                  borderColor: "hsl(var(--garden-green))",
                  color: "hsl(var(--garden-green))",
                  fontFamily: "var(--font-secondary)",
                }}
                asChild
              >
                <Link to="#waitlist">See More Therapists</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* 5. The Proof - "You're in Good Company" */}
        <section 
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--surface-accent))" }}
        >
          <Container>
            <div className="text-center space-y-lg">
              <h2 
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "hsl(var(--text-primary))",
                }}
              >
                Join the thousands who are finally feeling understood.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] mt-[var(--space-xl)]">
                <div 
                  className="p-4 md:p-5 lg:p-6 rounded-lg space-y-4"
                  style={{ backgroundColor: "hsl(var(--surface))" }}
                >
                  <div className="flex text-yellow-400 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p 
                    className="italic leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    "I already felt comfortable with her before our first session. It made the whole process so much easier."
                  </p>
                  <p 
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-secondary))",
                    }}
                  >
                    - Sarah, 28
                  </p>
                </div>
                
                <div 
                  className="p-4 md:p-5 lg:p-6 rounded-lg space-y-4"
                  style={{ backgroundColor: "hsl(var(--surface))" }}
                >
                  <div className="flex text-yellow-400 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p 
                    className="italic leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    "Finally, a way to see if we actually click before spending hundreds on sessions that don't work."
                  </p>
                  <p 
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-secondary))",
                    }}
                  >
                    - Marcus, 34
                  </p>
                </div>
                
                <div 
                  className="p-4 md:p-5 lg:p-6 rounded-lg space-y-4"
                  style={{ backgroundColor: "hsl(var(--surface))" }}
                >
                  <div className="flex text-yellow-400 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p 
                    className="italic leading-relaxed"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    "The video profiles helped me find someone who actually understands my cultural background."
                  </p>
                  <p 
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-secondary))",
                    }}
                  >
                    - Priya, 26
                  </p>
                </div>
              </div>
              
              <div 
                className="flex items-center justify-center gap-3 mt-8 p-4 rounded-lg"
                style={{ backgroundColor: "hsl(var(--surface))" }}
              >
                <Shield className="w-6 h-6" style={{ color: "hsl(var(--garden-green))" }} />
                <p 
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "hsl(var(--text-primary))",
                  }}
                >
                  <strong>Your privacy is our priority.</strong> Our platform is secure and GDPR-compliant.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. Final CTA - "Ready to Connect?" */}
        <section 
          id="waitlist"
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--garden-green))" }}
        >
          <Container>
            <div className="text-center space-y-lg max-w-2xl mx-auto">
              <h2 
                className="text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "hsl(var(--btn-primary-text))",
                }}
              >
                Ready to find your therapeutic fit?
              </h2>
              
              <p 
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-secondary)",
                  color: "hsl(var(--btn-primary-text))",
                  opacity: "0.9"
                }}
              >
                Explore MindFolk today and discover a more human way to find help.
              </p>
              
              <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-lg max-w-md mx-auto">
                <Button size="lg" className="w-full">
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* 7. Therapist Section */}
        <section 
          className="py-xl lg:py-2xl"
          style={{ backgroundColor: "hsl(var(--surface))" }}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-center">
              <div className="lg:col-span-6 space-y-md">
                <h2 
                  className="text-3xl lg:text-4xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "hsl(var(--text-primary))",
                  }}
                >
                  Are you a Therapist?
                </h2>
                
                <p 
                  className="text-xl leading-relaxed"
                  style={{
                    fontFamily: "var(--font-secondary)",
                    color: "hsl(var(--text-secondary))",
                  }}
                >
                  Stand out by <em className="italic">being yourself</em>.
                </p>
                
                <ul className="space-y-4 mt-6">
                  <li 
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "hsl(var(--garden-green))" }} />
                    Set your own rates, availability, and cancellation policy.
                  </li>
                  <li 
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "hsl(var(--garden-green))" }} />
                    Attract pre-qualified clients who value your style.
                  </li>
                  <li 
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "var(--font-secondary)",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "hsl(var(--garden-green))" }} />
                    All-in-one scheduling, payouts, and simple admin.
                  </li>
                </ul>
                
                <div className="pt-6">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-[var(--space-lg)]"
                    style={{
                      borderColor: "hsl(var(--garden-green))",
                      color: "hsl(var(--garden-green))",
                      fontFamily: "var(--font-secondary)",
                    }}
                    asChild
                  >
                    <Link to="/therapist">For Therapists</Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <img 
                  src="/images/therapist-white-female-50s.png"
                  alt="Professional therapist in a warm, welcoming office environment"
                  className="w-full h-auto rounded-lg drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>
    </PageShell>
  );
}