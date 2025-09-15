import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Video, 
  Shield, 
  Users, 
  CheckCircle, 
  Star,
  Clock,
  DollarSign,
  UserCheck,
  Eye,
  Book,
  Phone,
  ArrowRight
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="font-primary text-4xl lg:text-6xl font-bold text-text-primary leading-tight">
                  Find a therapist who truly gets you.
                </h1>
                <p className="font-secondary text-lg lg:text-xl text-text-secondary leading-relaxed">
                  Choose from therapists who match your personality, culture, and needs — with free chemistry calls before committing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="min-h-touch-comfort px-8" asChild>
                    <Link to="/browse">Find a Therapist</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="min-h-touch-comfort px-8" asChild>
                    <Link to="#how-it-works">
                      See How It Works
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-80 h-80 mx-auto">
                  {/* Editorial portrait placeholder - organic shape */}
                  <div className="absolute inset-0 bg-gradient-to-br from-tag-personality-bg to-tag-modality-bg rounded-[60px] rotate-12 transform"></div>
                  <div className="absolute inset-4 bg-tag-specialty-bg rounded-[50px] -rotate-6"></div>
                  <div className="absolute inset-8 bg-surface rounded-[40px] rotate-3 shadow-lg"></div>
                  {/* Editorial lines */}
                  <div className="absolute top-6 right-6 w-16 h-1 bg-tag-personality-text rotate-45"></div>
                  <div className="absolute bottom-6 left-6 w-12 h-1 bg-tag-modality-text -rotate-12"></div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Compatibility Matters */}
        <section className="py-16 lg:py-24 bg-surface-accent">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold text-text-primary">
                Comfort comes first.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center p-6 border-0 shadow-sm bg-tag-language-bg">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-tag-personality-bg rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-tag-personality-text" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-primary text-3xl font-bold text-text-primary">97%</div>
                    <p className="font-secondary text-sm text-text-secondary">
                      say relationship quality is <strong>the most important factor</strong> in therapy.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-sm bg-tag-modality-bg">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-tag-specialty-bg rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-tag-specialty-text" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-primary text-3xl font-bold text-text-primary">83%</div>
                    <p className="font-secondary text-sm text-text-secondary">
                      said finding <strong>compatibility info is difficult</strong>.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-sm bg-tag-misc-bg">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-tag-language-bg rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-tag-language-text" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-primary text-lg font-bold text-text-primary">Free trial calls</div>
                    <p className="font-secondary text-sm text-text-secondary">
                      15 minute chemistry calls included with every therapist.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-sm bg-tag-specialty-bg">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-tag-misc-bg rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-tag-misc-text" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-primary text-lg font-bold text-text-primary">Flexibility & diversity</div>
                    <p className="font-secondary text-sm text-text-secondary">
                      Find LGBT+ affirming, neurodivergence-aware, trauma-specialist therapists.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quote from research */}
            <div className="bg-surface rounded-2xl p-8 max-w-4xl mx-auto">
              <blockquote className="text-center">
                <p className="font-primary text-xl lg:text-2xl text-text-primary mb-4 italic">
                  "Looking back on the therapists I've tried, one of the biggest things for me is knowing that they are my <em className="font-bold not-italic">kind of person</em>."
                </p>
                <footer className="font-secondary text-text-secondary">
                  — 18–24, nonbinary/bisexual user
                </footer>
              </blockquote>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 lg:py-24">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold text-text-primary">
                How It Works
              </h2>
              <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
                Simple 3-step client journey to finding your perfect therapist match.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-tag-personality-bg rounded-full flex items-center justify-center">
                  <Video className="w-10 h-10 text-tag-personality-text" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Step 1: Browse Profiles
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Browse therapist profiles with intro videos, tags, and clear credentials.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-tag-modality-bg rounded-full flex items-center justify-center">
                  <Phone className="w-10 h-10 text-tag-modality-text" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Step 2: Chemistry Call
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Book a free 15-minute chemistry call to see if you click.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-tag-specialty-bg rounded-full flex items-center justify-center">
                  <DollarSign className="w-10 h-10 text-tag-specialty-text" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Step 3: Pay Per Session
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Pay only for the sessions you choose — no subscriptions.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Key Benefits Grid */}
        <section className="py-16 lg:py-24 bg-surface-accent">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <UserCheck className="w-12 h-12 text-success-bg" />
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Confidence from the start
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    See therapists' style and personality before booking.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <DollarSign className="w-12 h-12 text-info-bg" />
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Only pay for what you use
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Pay-per-session, with clear therapist-set rates.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <Phone className="w-12 h-12 text-warning-bg" />
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Free trial calls
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    15-minute chemistry calls included with every therapist.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <Users className="w-12 h-12 text-tag-language-text" />
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Flexibility & diversity
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Find LGBT+ affirming, neurodivergence-aware, trauma-specialist, and culturally aligned therapists.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Social Proof Band */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="bg-tag-misc-bg rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <blockquote className="space-y-4">
                    <p className="font-primary text-xl lg:text-2xl text-text-primary">
                      "Looking back on the therapists I've tried, one of the biggest things for me is knowing that they are my kind of person. This is great for that."
                    </p>
                    <footer className="font-secondary text-text-secondary">
                      — 18–24, nonbinary/bisexual user
                    </footer>
                  </blockquote>
                </div>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-surface rounded-lg">
                    <div className="font-primary text-2xl font-bold text-success-bg">87%</div>
                    <p className="font-secondary text-sm text-text-secondary">
                      say free trial sessions help them save time and money
                    </p>
                  </div>
                  <div className="text-center p-4 bg-surface rounded-lg">
                    <div className="font-primary text-2xl font-bold text-info-bg">95%</div>
                    <p className="font-secondary text-sm text-text-secondary">
                      prefer pay-per-session over subscriptions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Therapist Transparency Section */}
        <section className="py-16 lg:py-24 bg-surface-accent">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="font-primary text-3xl lg:text-4xl font-bold text-text-primary">
                  Clear credentials, clear pricing, clear policies.
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-success-bg flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-secondary font-semibold text-text-primary">Verified therapist registrations</h3>
                      <p className="font-secondary text-text-secondary">All therapists are licensed and verified professionals.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-success-bg flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-secondary font-semibold text-text-primary">No hidden fees</h3>
                      <p className="font-secondary text-text-secondary">Therapist sets rates & cancellation policies upfront.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-success-bg flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-secondary font-semibold text-text-primary">Easy-to-read profiles</h3>
                      <p className="font-secondary text-text-secondary">Clear specialties, qualifications, and approach descriptions.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Profile mockup placeholder */}
                <div className="bg-surface rounded-2xl p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-tag-personality-bg rounded-full"></div>
                      <div className="space-y-2">
                        <h4 className="font-primary font-bold text-text-primary">Laura Greene</h4>
                        <p className="font-secondary text-sm text-text-secondary">Licensed Therapist</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-secondary text-sm text-text-secondary">Sessions</span>
                        <span className="font-secondary text-sm font-medium text-text-primary">$120-140</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-secondary text-sm text-text-secondary">Chemistry call</span>
                        <span className="font-secondary text-sm font-medium text-success-bg">Free</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Education Band */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="text-center space-y-8">
              <h2 className="font-primary text-2xl lg:text-3xl font-bold text-text-primary">
                Learn more about finding the right fit
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Button variant="outline" className="h-auto p-6 text-left" asChild>
                  <Link to="/resources/right-therapist">
                    <div className="space-y-2">
                      <Book className="w-6 h-6 text-tag-personality-text" />
                      <h3 className="font-secondary font-semibold">How to know if a therapist is right for you</h3>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-6 text-left" asChild>
                  <Link to="/resources/client-values">
                    <div className="space-y-2">
                      <Heart className="w-6 h-6 text-tag-modality-text" />
                      <h3 className="font-secondary font-semibold">What clients told us they value most in therapy</h3>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto p-6 text-left" asChild>
                  <Link to="/resources/first-session">
                    <div className="space-y-2">
                      <Star className="w-6 h-6 text-tag-specialty-text" />
                      <h3 className="font-secondary font-semibold">Tips for getting the most out of your first session</h3>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Therapist Path CTA */}
        <section className="py-16 lg:py-24 bg-tag-modality-bg">
          <Container>
            <div className="text-center space-y-8">
              <h2 className="font-primary text-3xl lg:text-4xl font-bold text-text-primary">
                Are you a therapist?
              </h2>
              <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
                Join Mindfolk to reach clients who value your style and keep control of your practice.
              </p>
              <Button size="lg" variant="outline" className="min-h-touch-comfort px-8" asChild>
                <Link to="/therapist">For Therapists</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="font-primary text-3xl lg:text-5xl font-bold text-text-primary">
                Ready to start therapy that feels like a fit?
              </h2>
              <Button size="lg" className="min-h-touch-comfort px-12" asChild>
                <Link to="/browse">Find a Therapist</Link>
              </Button>
              
              <div className="flex items-center justify-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success-bg" />
                  <span className="font-secondary text-sm text-text-secondary">Free to browse</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success-bg" />
                  <span className="font-secondary text-sm text-text-secondary">Free chemistry calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success-bg" />
                  <span className="font-secondary text-sm text-text-secondary">GDPR compliant</span>
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