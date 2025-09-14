import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Video, Shield, Users, CheckCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1
            }}
          />
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="font-primary text-3xl lg:text-6xl font-bold text-text-primary leading-tight">
                Find the right therapist for you
              </h1>
              <p className="font-secondary text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Watch 30–60s videos. Book a free chemistry call. Only pay for sessions you book.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="min-h-touch-comfort px-8" asChild>
                  <Link to="/assessment">Start Your Journey</Link>
                </Button>
                <Button variant="outline" size="lg" className="min-h-touch-comfort px-8" asChild>
                  <Link to="/therapist/signup">Join as Therapist</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center pt-6">
                <Tag category="misc">Therapy that fits you—not a directory</Tag>
                <Tag category="personality">Find a therapist you actually click with</Tag>
                <Tag category="modality">Private by default</Tag>
                <Tag category="specialty">Inclusive & accessible</Tag>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-surface">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                How MindFolk Works
              </h2>
              <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
                An algorithm that understands successful therapy isn't about patients, it's about people.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-tag-personality rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-tag-personality-foreground" />
                  </div>
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Watch Video Profiles
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Get a feel for therapists' personalities and styles through 30-60 second introductions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-tag-modality rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-tag-modality-foreground" />
                  </div>
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Free Chemistry Calls
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    Book 15-minute video calls to see if you click before committing to full sessions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-0 shadow-sm">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-tag-specialty rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-tag-specialty-foreground" />
                  </div>
                  <h3 className="font-primary text-xl font-semibold text-text-primary">
                    Pay Per Session
                  </h3>
                  <p className="font-secondary text-text-secondary">
                    No subscriptions or upfront costs. Only pay for the therapy sessions you actually book.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Evidence Points Section */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                Why Personality Matters
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-warning/20 rounded-full flex items-center justify-center">
                  <span className="font-primary text-2xl font-bold text-warning-foreground">57%</span>
                </div>
                <p className="font-secondary text-text-secondary">
                  give up on therapy after trying 1–2 therapists. On average, it takes 6–12 to find the right fit.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                  <span className="font-primary text-2xl font-bold text-success-foreground">74%</span>
                </div>
                <p className="font-secondary text-text-secondary">
                  of therapists believe a short video introduction would increase client compatibility.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-info/20 rounded-full flex items-center justify-center">
                  <span className="font-primary text-2xl font-bold text-info-foreground">88%</span>
                </div>
                <p className="font-secondary text-text-secondary">
                  of people looking for therapy believe 60-second videos would help them find the right fit faster.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-surface-accent">
          <Container>
            <div className="text-center space-y-8">
              <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
                Ready to find your therapist?
              </h2>
              <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
                Join thousands who've found their perfect therapeutic match through our personality-first approach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="min-h-touch-comfort px-8" asChild>
                  <Link to="/assessment">Start Your Assessment</Link>
                </Button>
                <Button variant="outline" size="lg" className="min-h-touch-comfort px-8" asChild>
                  <Link to="/therapist/signup">Join as Therapist</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-6 pt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-secondary text-sm text-text-secondary">Free to browse</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-secondary text-sm text-text-secondary">Free chemistry calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
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