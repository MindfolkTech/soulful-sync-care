import React from 'react';
import { Card, CardContent } from './card';
import { EditorialLine, PlayfulDots, EditorialQuote } from './editorial-shapes';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Finding my therapist through MindFolk was like finally finding someone who gets me. The video profiles made all the difference.",
    author: "Sarah M.",
    location: "San Francisco",
    category: "personality"
  },
  {
    quote: "The chemistry call saved me months of trial and error. I knew within 5 minutes we'd work well together.",
    author: "Michael R.",
    location: "New York",
    category: "modality"
  },
  {
    quote: "Pay-per-session pricing meant I could afford quality therapy without breaking the bank or committing to monthly fees.",
    author: "Jessica L.",
    location: "Austin",
    category: "specialty"
  }
];

export const MagazineTestimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-surface relative overflow-hidden">
      {/* Editorial decorations */}
      <EditorialLine className="top-20 left-10" />
      <PlayfulDots className="top-32 right-20" />
      <EditorialQuote className="top-10 right-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-garden-green/30" />
          <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
            Real Stories, Real Connections
          </h2>
          <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
            See how our personality-first approach has transformed therapy experiences
          </p>
        </div>

        {/* Magazine-style testimonial layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Large featured testimonial */}
          <div className="lg:col-span-8 relative">
            <Card className="border-0 shadow-lg bg-tag-personality/5 overflow-hidden">
              <CardContent className="p-8 lg:p-12 relative">
                <EditorialQuote className="-top-4 -left-2" />
                <div className="flex items-start space-x-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-current" />
                  ))}
                </div>
                <blockquote className="font-primary text-xl lg:text-2xl text-text-primary leading-relaxed mb-6">
                  "{testimonials[0].quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <cite className="font-secondary font-semibold text-text-primary not-italic">
                      {testimonials[0].author}
                    </cite>
                    <p className="font-secondary text-sm text-text-secondary">
                      {testimonials[0].location}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-tag-personality to-tag-modality rounded-full opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar testimonials */}
          <div className="lg:col-span-4 space-y-6">
            {testimonials.slice(1).map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md bg-surface relative group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 relative">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-tag-${testimonial.category}`} />
                  <blockquote className="font-primary text-base text-text-primary leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <cite className="font-secondary font-semibold text-text-primary not-italic text-sm">
                        {testimonial.author}
                      </cite>
                      <p className="font-secondary text-xs text-text-secondary">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Call-to-action card */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-garden-green/5 to-tag-personality/5 relative">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-garden-green/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-garden-green" />
                </div>
                <h3 className="font-primary text-lg font-semibold text-text-primary mb-2">
                  Join Them
                </h3>
                <p className="font-secondary text-sm text-text-secondary mb-4">
                  Start your journey to finding the right therapist
                </p>
                <div className="text-xs font-secondary text-garden-green font-medium">
                  Free to browse • No commitments
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};