import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Video, Shield, Users, CheckCircle, Star, Sparkles, ArrowRight, Quote } from "lucide-react";
import { FloatingCircle, GeometricTriangle, EditorialLine, PlayfulDots, EditorialQuote, MagazineAccent } from "@/components/ui/editorial-shapes";
import { MagazineTestimonials } from "@/components/ui/magazine-testimonials";
import { EditorialStats } from "@/components/ui/editorial-stats";
import heroImage from "@/assets/hero-image.jpg";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-warm-white via-surface to-tag-personality/5">
          {/* Editorial decorations */}
          <FloatingCircle className="top-20 left-10 opacity-60" color="tag-personality" />
          <FloatingCircle className="top-40 right-20 opacity-40" color="tag-modality" />
          <GeometricTriangle className="top-32 left-1/4" />
          <EditorialLine className="top-1/2 right-10 transform -translate-y-1/2" orientation="diagonal" />
          <PlayfulDots className="bottom-20 left-20" />
          <MagazineAccent className="top-10 right-1/3" variant="floating" />
          
          {/* Hero image treatment */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.03,
              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
            }}
          />
          
          <Container className="relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Editorial header treatment */}
              <div className="text-center space-y-8 mb-12">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-8 h-0.5 bg-garden-green/60" />
                  <Sparkles className="w-5 h-5 text-garden-green" />
                  <div className="w-8 h-0.5 bg-garden-green/60" />
                </div>
                
                <h1 className="font-primary text-4xl lg:text-7xl font-bold text-text-primary leading-tight relative">
                  Find the 
                  <span className="relative inline-block mx-4">
                    <span className="text-garden-green">right</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-tag-personality/60 to-tag-modality/60" />
                  </span>
                  therapist
                  <br />
                  <span className="text-2xl lg:text-4xl font-secondary font-normal text-text-secondary italic">
                    for you
                  </span>
                </h1>
                
                <div className="relative max-w-3xl mx-auto">
                  <EditorialQuote className="-top-6 -left-8" />
                  <p className="font-secondary text-xl lg:text-2xl text-text-secondary leading-relaxed bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-garden-green/10">
                    Watch 30–60s videos. Book a free chemistry call. Only pay for sessions you book.
                  </p>
                </div>
              </div>
              
              {/* Asymmetrical button layout */}
              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start">
                <div className="flex flex-col items-center space-y-4">
                  <Button size="lg" className="min-h-touch-comfort px-8 bg-garden-green hover:bg-garden-green/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
                    <Link to="/assessment">
                      Start Your Journey
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <div className="text-xs font-secondary text-text-secondary">
                    Free assessment • No commitments
                  </div>
                </div>
                
                <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-garden-green/30 to-transparent" />
                
                <div className="flex flex-col items-center space-y-4">
                  <Button variant="outline" size="lg" className="min-h-touch-comfort px-8 border-garden-green/30 hover:bg-garden-green/5 group" asChild>
                    <Link to="/therapist/signup">
                      Join as Therapist
                      <Heart className="w-4 h-4 ml-2 text-garden-green group-hover:scale-110 transition-transform" />
                    </Link>
                  </Button>
                  <div className="text-xs font-secondary text-text-secondary">
                    Grow your practice
                  </div>
                </div>
              </div>

              {/* Editorial tag cloud */}
              <div className="mt-16 relative">
                <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                  <div className="relative group">
                    <Tag category="misc" className="group-hover:scale-105 transition-transform">
                      Therapy that fits you—not a directory
                    </Tag>
                    <MagazineAccent className="-top-2 -right-2 opacity-0 group-hover:opacity-60 transition-opacity" variant="corner" />
                  </div>
                  <Tag category="personality" className="hover:scale-105 transition-transform">
                    Find a therapist you actually click with
                  </Tag>
                  <Tag category="modality" className="hover:scale-105 transition-transform">
                    Private by default
                  </Tag>
                  <Tag category="specialty" className="hover:scale-105 transition-transform">
                    Inclusive & accessible
                  </Tag>
                </div>
                
                {/* Editorial accent line */}
                <div className="mt-8 flex justify-center">
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-garden-green/60 to-transparent" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Editorial Features Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-surface to-tag-modality/5 relative overflow-hidden">
          {/* Editorial decorations */}
          <EditorialLine className="top-20 left-10" />
          <PlayfulDots className="top-32 right-16" />
          <MagazineAccent className="bottom-20 left-1/4" variant="side" />
          
          <Container>
            <div className="text-center space-y-6 mb-20 relative">
              <div className="inline-block relative">
                <h2 className="font-primary text-3xl lg:text-5xl font-bold text-text-primary">
                  How MindFolk Works
                </h2>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-garden-green/60 to-tag-personality/60" />
              </div>
              
              <div className="max-w-3xl mx-auto relative">
                <p className="font-secondary text-xl text-text-secondary leading-relaxed">
                  An algorithm that understands successful therapy isn't about 
                  <span className="relative inline-block mx-2">
                    <span className="line-through text-text-muted">patients</span>
                    <span className="absolute -bottom-1 left-0 w-full text-xs text-garden-green font-medium">
                      people
                    </span>
                  </span>
                  —it's about human connection.
                </p>
              </div>
            </div>

            {/* Magazine-style asymmetrical layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Large featured card */}
              <div className="lg:col-span-7 relative">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-tag-personality/10 to-surface overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-8 lg:p-12 relative">
                    <MagazineAccent className="-top-4 -right-4" variant="floating" />
                    
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-tag-personality to-tag-personality/60 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Video className="w-8 h-8 text-tag-personality-foreground" />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <h3 className="font-primary text-2xl lg:text-3xl font-bold text-text-primary">
                          Watch Video Profiles
                        </h3>
                        <p className="font-secondary text-lg text-text-secondary leading-relaxed">
                          Get a feel for therapists' personalities and styles through authentic 30-60 second introductions. 
                          See their communication style, energy, and approach before making contact.
                        </p>
                        
                        <div className="flex items-center space-x-4 pt-4">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 bg-tag-personality/60 rounded-full border-2 border-surface" />
                            <div className="w-8 h-8 bg-tag-modality/60 rounded-full border-2 border-surface" />
                            <div className="w-8 h-8 bg-tag-specialty/60 rounded-full border-2 border-surface" />
                          </div>
                          <span className="text-sm font-secondary text-text-secondary">
                            200+ therapist videos
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stacked smaller cards */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border-0 shadow-lg bg-surface group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tag-modality to-tag-modality/60" />
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-tag-modality/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Heart className="w-6 h-6 text-tag-modality-foreground" />
                      </div>
                      <h3 className="font-primary text-xl font-semibold text-text-primary">
                        Free Chemistry Calls
                      </h3>
                    </div>
                    
                    <p className="font-secondary text-text-secondary leading-relaxed">
                      Book 15-minute video calls to see if you click before committing to full sessions.
                    </p>
                    
                    <div className="mt-4 inline-block px-3 py-1 bg-tag-modality/20 rounded-full">
                      <span className="text-xs font-secondary text-tag-modality-foreground font-medium">
                        100% Free
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-surface group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tag-specialty to-tag-specialty/60" />
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-tag-specialty/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-6 h-6 text-tag-specialty-foreground" />
                      </div>
                      <h3 className="font-primary text-xl font-semibold text-text-primary">
                        Pay Per Session
                      </h3>
                    </div>
                    
                    <p className="font-secondary text-text-secondary leading-relaxed">
                      No subscriptions or upfront costs. Only pay for the therapy sessions you actually book.
                    </p>
                    
                    <div className="mt-4 inline-block px-3 py-1 bg-tag-specialty/20 rounded-full">
                      <span className="text-xs font-secondary text-tag-specialty-foreground font-medium">
                        No Hidden Fees
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Editorial Stats Section */}
        <EditorialStats />

        {/* Magazine Testimonials */}
        <MagazineTestimonials />

        {/* Editorial CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-surface-accent via-tag-personality/5 to-surface-accent relative overflow-hidden">
          {/* Editorial decorations */}
          <FloatingCircle className="top-10 left-10 opacity-40" color="tag-modality" />
          <FloatingCircle className="bottom-20 right-10 opacity-60" color="tag-specialty" />
          <EditorialLine className="top-1/3 right-20" orientation="vertical" />
          <GeometricTriangle className="bottom-32 left-1/4" />
          <MagazineAccent className="top-16 left-1/3" variant="floating" />
          
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-10 relative">
              {/* Editorial header */}
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-garden-green/60" />
                  <Quote className="w-6 h-6 text-garden-green" />
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-garden-green/60" />
                </div>
                
                <h2 className="font-primary text-3xl lg:text-5xl font-bold text-text-primary relative">
                  Ready to find 
                  <span className="relative inline-block mx-3">
                    <span className="text-garden-green">your</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-tag-personality/80 to-tag-modality/80" />
                  </span>
                  therapist?
                </h2>
                
                <div className="max-w-3xl mx-auto bg-surface/90 backdrop-blur-sm rounded-xl p-6 border border-garden-green/10 shadow-lg">
                  <p className="font-secondary text-xl text-text-secondary leading-relaxed">
                    Join thousands who've found their perfect therapeutic match through our 
                    <span className="font-semibold text-garden-green">personality-first approach</span>.
                  </p>
                </div>
              </div>
              
              {/* Editorial button layout */}
              <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                <div className="relative group">
                  <MagazineAccent className="-top-3 -right-3 opacity-0 group-hover:opacity-60 transition-opacity" variant="corner" />
                  <Button 
                    size="lg" 
                    className="min-h-touch-comfort px-10 py-4 bg-garden-green hover:bg-garden-green/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    asChild
                  >
                    <Link to="/assessment">
                      <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Start Your Assessment
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-secondary text-text-secondary">
                    Free • 3 minutes • No signup required
                  </div>
                </div>
                
                <div className="hidden lg:block w-px h-20 bg-gradient-to-b from-transparent via-garden-green/30 to-transparent" />
                
                <div className="relative group">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="min-h-touch-comfort px-10 py-4 border-2 border-garden-green/30 hover:bg-garden-green/5 hover:border-garden-green/60 transition-all duration-300 group"
                    asChild
                  >
                    <Link to="/therapist/signup">
                      <Heart className="w-5 h-5 mr-2 text-garden-green group-hover:scale-110 transition-transform" />
                      Join as Therapist
                    </Link>
                  </Button>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-secondary text-text-secondary">
                    Grow your practice with us
                  </div>
                </div>
              </div>

              {/* Editorial feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 pt-12">
                <div className="flex items-center justify-center space-x-3 p-4 bg-surface/60 backdrop-blur-sm rounded-lg border border-garden-green/10 group hover:bg-surface/80 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-success group-hover:scale-110 transition-transform" />
                  <span className="font-secondary text-text-secondary group-hover:text-text-primary transition-colors">
                    Free to browse
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3 p-4 bg-surface/60 backdrop-blur-sm rounded-lg border border-garden-green/10 group hover:bg-surface/80 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-success group-hover:scale-110 transition-transform" />
                  <span className="font-secondary text-text-secondary group-hover:text-text-primary transition-colors">
                    Free chemistry calls
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3 p-4 bg-surface/60 backdrop-blur-sm rounded-lg border border-garden-green/10 group hover:bg-surface/80 transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-success group-hover:scale-110 transition-transform" />
                  <span className="font-secondary text-text-secondary group-hover:text-text-primary transition-colors">
                    GDPR compliant
                  </span>
                </div>
              </div>
              
              {/* Editorial closing accent */}
              <div className="pt-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-garden-green/40" />
                  <div className="w-3 h-3 rounded-full bg-garden-green/60" />
                  <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-garden-green/40" />
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