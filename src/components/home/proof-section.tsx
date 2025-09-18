import { Container } from "@/components/ui/container";
import { Shield, Star } from "lucide-react";

const testimonials = [
  {
    quote: "I already felt comfortable with her before our first session. It made the whole process so much easier.",
    author: "Sarah, 28",
    image: "/images/client-white-female-autistic-20s.png"
  },
  {
    quote: "The video intros are genius. You can tell so much about someone's vibe in 30 seconds.",
    author: "Marcus, 35",
    image: "/images/client-white-male-20s-neutral-shirt.png"
  },
  {
    quote: "Finally found someone who actually gets my cultural background. Game changer.",
    author: "Priya, 42",
    image: "/images/client-white-male-20s-lilac-shirt.png"
  }
];

export function ProofSection() {
  return (
    <section className="py-12 lg:py-20 bg-warm-white">
      <Container>
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="font-primary text-jovial-jade text-3xl lg:text-4xl font-bold leading-tight">
              You're in Good Company
            </h2>
            <p className="font-secondary text-text-secondary text-lg mt-4">
              Join the thousands who are finally feeling understood.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-border">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="font-secondary text-text-primary italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.author} - satisfied client`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <cite className="font-secondary text-text-secondary text-sm not-italic">
                    — {testimonial.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-surface-accent rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <Shield className="w-6 h-6 text-garden-green" />
              <p className="font-secondary text-text-primary font-medium">
                Your privacy is our priority. Our platform is secure and GDPR-compliant.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}