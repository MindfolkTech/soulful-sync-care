import React from 'react';
import { EditorialLine, MagazineAccent, PlayfulDots } from './editorial-shapes';

const stats = [
  {
    number: "57%",
    description: "give up on therapy after trying 1–2 therapists. On average, it takes 6–12 to find the right fit.",
    color: "warning",
    shape: "circle"
  },
  {
    number: "74%",
    description: "of therapists believe a short video introduction would increase client compatibility.",
    color: "success",
    shape: "square"
  },
  {
    number: "88%",
    description: "of people looking for therapy believe 60-second videos would help them find the right fit faster.",
    color: "info",
    shape: "diamond"
  }
];

export const EditorialStats = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Editorial decorations */}
      <MagazineAccent className="top-10 left-10" variant="corner" />
      <EditorialLine className="top-1/2 right-20 transform -translate-y-1/2" orientation="vertical" />
      <PlayfulDots className="bottom-20 left-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-0.5 bg-garden-green/40" />
              <div className="w-2 h-2 rounded-full bg-garden-green/60" />
              <div className="w-8 h-0.5 bg-garden-green/40" />
            </div>
          </div>
          <h2 className="font-primary text-2xl lg:text-4xl font-bold text-text-primary">
            Why Personality Matters
          </h2>
          <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
            The numbers tell a compelling story about the importance of connection in therapy
          </p>
        </div>

        {/* Magazine-style stats layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              {/* Background editorial elements */}
              <MagazineAccent 
                className={`-top-4 -right-4 opacity-60 group-hover:opacity-80 transition-opacity`}
                variant="floating"
              />
              
              <div className="text-center space-y-6 relative z-10">
                {/* Stylized number container */}
                <div className="relative inline-block">
                  {stat.shape === 'circle' && (
                    <div className={`w-24 h-24 mx-auto bg-${stat.color}/20 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-garden-green/10" />
                      <span className={`font-primary text-3xl font-bold text-${stat.color}-foreground relative z-10`}>
                        {stat.number}
                      </span>
                    </div>
                  )}
                  
                  {stat.shape === 'square' && (
                    <div className={`w-24 h-24 mx-auto bg-${stat.color}/20 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:rotate-2 transition-transform duration-300`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-garden-green/10" />
                      <span className={`font-primary text-3xl font-bold text-${stat.color}-foreground relative z-10`}>
                        {stat.number}
                      </span>
                    </div>
                  )}
                  
                  {stat.shape === 'diamond' && (
                    <div className={`w-24 h-24 mx-auto bg-${stat.color}/20 flex items-center justify-center relative overflow-hidden transform rotate-45 group-hover:rotate-12 transition-transform duration-300`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-garden-green/10" />
                      <span className={`font-primary text-3xl font-bold text-${stat.color}-foreground relative z-10 transform -rotate-45`}>
                        {stat.number}
                      </span>
                    </div>
                  )}
                  
                  {/* Decorative accent */}
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 bg-tag-personality/40 rounded-full group-hover:scale-125 transition-transform duration-300`} />
                </div>

                {/* Editorial text treatment */}
                <div className="relative">
                  <p className="font-secondary text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {stat.description}
                  </p>
                  
                  {/* Decorative underline */}
                  <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-tag-${stat.color}/60 group-hover:w-16 transition-all duration-300`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial bottom accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-garden-green/40" />
            <div className="font-secondary text-sm text-text-secondary italic">
              Research-backed insights
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-garden-green/40" />
          </div>
        </div>
      </div>
    </section>
  );
};