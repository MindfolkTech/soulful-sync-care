import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Calendar, Play } from "lucide-react";

export default function TherapistDetail() {
  const { id } = useParams();

  const therapist = {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Clinical Psychologist",
    credentials: "DClinPsy, HCPC Registered",
    specialties: ["Anxiety", "Depression", "Trauma", "EMDR"],
    personality: ["Empathetic", "Structured", "Goal-oriented"],
    modalities: ["CBT", "EMDR", "Mindfulness"],
    languages: ["English", "Mandarin"],
    experience: "8 years",
    rate: "£80/session",
    rating: 4.9,
    reviewCount: 127,
    bio: "I am a Clinical Psychologist with over 8 years of experience helping individuals navigate anxiety, depression, and trauma. My approach combines evidence-based therapies with a warm, empathetic style that creates a safe space for healing and growth.",
    quote: "I believe in creating a safe space where you can explore your authentic self and develop the tools you need to thrive.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
    videoUrl: "https://example.com/video",
    availability: ["Mon 10am-4pm", "Wed 2pm-8pm", "Fri 9am-3pm"],
    isVerified: true
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative">
                      <img
                        src={therapist.image}
                        alt={`${therapist.name} profile`}
                        className="w-48 h-48 object-cover rounded-lg mx-auto md:mx-0"
                      />
                      {therapist.videoUrl && (
                        <Button
                          size="sm"
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-primary/80 hover:bg-primary"
                        >
                          <Play className="w-6 h-6 fill-white" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                          <h1 className="font-primary text-3xl font-bold text-text-primary">
                            {therapist.name}
                          </h1>
                          {therapist.isVerified && (
                            <Badge variant="secondary" className="bg-success text-success-foreground">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="font-secondary text-text-secondary">
                          {therapist.title}
                        </p>
                        <p className="font-secondary text-sm text-text-muted">
                          {therapist.credentials}
                        </p>
                      </div>

                      <div className="flex items-center justify-center md:justify-start space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-[--warning-text] text-[--warning-text]" />
                          <span className="font-secondary font-semibold">
                            {therapist.rating}
                          </span>
                          <span className="font-secondary text-text-secondary text-sm">
                            ({therapist.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="font-secondary text-text-secondary">
                          {therapist.experience} experience
                        </div>
                      </div>

                      <blockquote className="font-secondary text-text-primary italic">
                        "{therapist.quote}"
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-primary text-xl font-semibold text-text-primary mb-4">
                    About
                  </h2>
                  <p className="font-secondary text-text-secondary leading-relaxed">
                    {therapist.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Specialties & Approach */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-primary text-lg font-semibold text-text-primary mb-3">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.specialties.map((specialty) => (
                        <Tag key={specialty} category="specialty">
                          {specialty}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-primary text-lg font-semibold text-text-primary mb-3">
                      Therapeutic Approach
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.modalities.map((modality) => (
                        <Tag key={modality} category="modality">
                          {modality}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-primary text-lg font-semibold text-text-primary mb-3">
                      Communication Style
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.personality.map((trait) => (
                        <Tag key={trait} category="personality">
                          {trait}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-primary text-lg font-semibold text-text-primary mb-3">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {therapist.languages.map((language) => (
                        <Tag key={language} category="language">
                          {language}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-8">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="font-primary text-2xl font-bold text-text-primary">
                      {therapist.rate}
                    </div>
                    <div className="font-secondary text-text-secondary text-sm">
                      50-minute session
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Free Chemistry Call
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Favorites
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-primary font-semibold text-text-primary mb-2">
                      Next Available
                    </h4>
                    <div className="space-y-1 text-sm font-secondary text-text-secondary">
                      {therapist.availability.map((slot, index) => (
                        <div key={index}>{slot}</div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}