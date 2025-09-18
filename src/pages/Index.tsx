import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ProblemSection } from "@/components/home/problem-section";
import { SolutionSection } from "@/components/home/solution-section";
import { TherapistsSection } from "@/components/home/therapists-section";
import { ProofSection } from "@/components/home/proof-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { TherapistBandSection } from "@/components/home/therapist-band-section";

export default function Index() {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/images/master-landing-hero-option-a.png";
    (link as any).fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh overflow-x-hidden bg-warm-white">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <TherapistsSection />
        <ProofSection />
        <FinalCtaSection />
        <TherapistBandSection />
      </main>

      <Footer />
    </div>
  );
}
