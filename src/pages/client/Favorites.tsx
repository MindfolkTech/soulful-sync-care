import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Heart, Star, Calendar } from "lucide-react";

const favoriteTherapists = [
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
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    availableToday: true,
    nextAvailable: "Today 2:00 PM"
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
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    availableToday: false,
    nextAvailable: "Tomorrow 10:00 AM"
  }
];

export default function Favorites() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-primary text-3xl font-bold text-text-primary">
                Your Favorites
              </h1>
              <p className="font-secondary text-text-secondary mt-2">
                Therapists you've saved for easy booking
              </p>
            </div>

            {favoriteTherapists.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center space-y-4">
                  <Heart className="w-16 h-16 mx-auto text-text-muted" />
                  <div>
                    <h3 className="font-primary text-lg font-semibold text-text-primary mb-2">
                      No favorites yet
                    </h3>
                    <p className="font-secondary text-text-secondary">
                      Browse therapists and save your favorites for easy booking
                    </p>
                  </div>
                  <Button asChild>
                    <a href="/discover">Discover Therapists</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {favoriteTherapists.map((therapist) => (
                  <Card key={therapist.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="shrink-0">
                          <img
                            src={therapist.image}
                            alt={`${therapist.name} profile`}
                            className="w-32 h-32 object-cover rounded-lg mx-auto md:mx-0"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-primary text-xl font-semibold text-text-primary">
                                {therapist.name}
                              </h3>
                              <p className="font-secondary text-text-secondary">
                                {therapist.title}
                              </p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-secondary text-sm text-text-secondary">
                                  {therapist.rating}
                                </span>
                              </div>
                            </div>
                            
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </Button>
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
                            <div className="flex items-center space-x-4">
                              <span className="font-secondary font-semibold text-text-primary">
                                {therapist.rate}
                              </span>
                              <div className="flex gap-1">
                                {therapist.languages.map((lang) => (
                                  <Tag key={lang} category="language" size="sm">
                                    {lang}
                                  </Tag>
                                ))}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-secondary text-sm text-text-secondary">
                                Next available: {therapist.nextAvailable}
                              </div>
                              {therapist.availableToday && (
                                <div className="font-secondary text-sm text-success font-semibold">
                                  Available today
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-3 pt-2">
                            <Button className="flex-1">
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Now
                            </Button>
                            <Button variant="outline" className="flex-1">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}