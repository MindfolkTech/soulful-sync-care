import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Heart, Filter, Star } from "lucide-react";

const mockTherapists = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    personality: ["Empathetic", "Structured"],
    languages: ["English", "Mandarin"],
    rate: "£80/session",
    rating: 4.9,
    quote: "I believe in creating a safe space where you can explore your authentic self.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: "2", 
    name: "Michael Thompson",
    title: "Counselling Psychologist",
    specialties: ["Relationships", "Work Stress"],
    personality: ["Flexible", "Calm"],
    languages: ["English", "French"],
    rate: "£70/session", 
    rating: 4.8,
    quote: "Together, we'll find practical solutions that work for your unique situation.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  }
];

export default function Discover() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-primary text-3xl font-bold text-text-primary">
                Discover Therapists
              </h1>
              <p className="font-secondary text-text-secondary mt-2">
                Swipe through therapists matched to your preferences
              </p>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTherapists.map((therapist) => (
              <Card key={therapist.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={therapist.image}
                      alt={`${therapist.name} profile`}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-primary text-xl font-semibold text-text-primary">
                          {therapist.name}
                        </h3>
                        <p className="font-secondary text-text-secondary text-sm">
                          {therapist.title}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-secondary text-sm text-text-secondary">
                          {therapist.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {therapist.specialties.map((specialty) => (
                        <Tag key={specialty} category="specialty" size="sm">
                          {specialty}
                        </Tag>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {therapist.personality.map((trait) => (
                        <Tag key={trait} category="personality" size="sm">
                          {trait}
                        </Tag>
                      ))}
                    </div>

                    <blockquote className="font-secondary text-text-secondary italic text-sm">
                      "{therapist.quote}"
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <span className="font-secondary font-semibold text-text-primary">
                        {therapist.rate}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {therapist.languages.map((lang) => (
                          <Tag key={lang} category="language" size="sm">
                            {lang}
                          </Tag>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Book Chemistry Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}