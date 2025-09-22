import { PageShell } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/container";

export default function Terms() {
  return (
    <PageShell>
      <div className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))] mb-8">
              Terms of Service
            </h1>
            
            <div className="space-y-6 font-secondary text-[hsl(var(--text-secondary))]">
              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  1. Introduction
                </h2>
                <p>
                  Welcome to MindFolk. These Terms of Service govern your use of our personality-first 
                  therapy matching platform.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  2. Service Description
                </h2>
                <p>
                  MindFolk provides a platform to connect clients with licensed therapists through 
                  video profiles, chemistry calls, and session booking.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  3. User Responsibilities
                </h2>
                <p>
                  Users must provide accurate information and comply with our community guidelines.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  4. Privacy and Data Protection
                </h2>
                <p>
                  We are committed to protecting your privacy in accordance with GDPR and UK data 
                  protection laws.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  5. Contact
                </h2>
                <p>
                  For questions about these terms, please contact us at legal@mindfolk.com
                </p>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </PageShell>
  );
}
