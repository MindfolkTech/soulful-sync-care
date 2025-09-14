import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h1 className="font-primary text-3xl font-bold text-text-primary mb-8">
              Privacy Policy
            </h1>
            
            <div className="space-y-6 font-secondary text-text-secondary">
              <section>
                <h2 className="font-primary text-xl font-semibold text-text-primary mb-4">
                  1. Data We Collect
                </h2>
                <p>
                  We collect information you provide during assessment, profile creation, and 
                  platform usage to match you with compatible therapists.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-text-primary mb-4">
                  2. How We Use Your Data
                </h2>
                <p>
                  Your data is used for matching algorithms, communication facilitation, and 
                  service improvement. We never sell personal information.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-text-primary mb-4">
                  3. Data Security
                </h2>
                <p>
                  We implement industry-standard security measures including encryption, 
                  secure storage, and regular security audits.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-text-primary mb-4">
                  4. Your Rights
                </h2>
                <p>
                  Under GDPR, you have rights to access, rectify, erase, and port your data. 
                  Contact us to exercise these rights.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-text-primary mb-4">
                  5. Contact
                </h2>
                <p>
                  For privacy questions, contact our Data Protection Officer at privacy@mindfolk.com
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}