import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const therapists = [
  {
    image: "/images/therapist-black-female-40s.png",
    name: "Dr. Sarah",
    tags: ["LGBTQ+ Advocate", "Trauma Informed", "CBT Specialist"]
  },
  {
    image: "/images/therapist-white-nonbinary-30s.png", 
    name: "Alex",
    tags: ["Neurodiversity Affirming", "Life Transitions", "Anxiety"]
  },
  {
    image: "/images/therapist-white-female-50s.png",
    name: "Dr. Maria",
    tags: ["Relationship Therapy", "Mindfulness", "Depression"]
  }
];

export function TherapistsSection() {
  return (
    <section className="py-12 lg:py-20 bg-surface">
      <Container>
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="font-primary text-jovial-jade text-3xl lg:text-4xl font-bold leading-tight">
              Real Therapists, Real Personalities.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {therapists.map((therapist, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={therapist.image}
                    alt={`${therapist.name} - Therapist video profile preview`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-garden-green border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="font-secondary font-bold text-lg text-text-primary">
                    {therapist.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {therapist.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        className="bg-tag-specialty-bg text-tag-specialty-text text-xs px-2 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline"
              size="lg"
              className="border-garden-green text-garden-green hover:bg-garden-green hover:text-white"
            >
              See More Therapists
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}