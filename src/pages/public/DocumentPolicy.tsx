import { PublicPageLayout } from "@/components/layout/public-page-layout";
import { Container } from "@/components/ui/container";

export default function DocumentPolicy() {
  return (
    <PublicPageLayout>
      <Container size="md">
        <div className="py-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="font-primary text-4xl font-bold text-text-primary">
              Document Policy for Therapists
            </h1>
            <p className="font-secondary text-lg text-text-secondary max-w-2xl mx-auto">
              Required documentation for therapist verification on MindFolk platform
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="font-primary text-2xl font-bold text-text-primary">
                Required Professional Documentation
              </h2>
              <p className="font-secondary text-text-secondary leading-relaxed">
                In accordance with UK regulations and professional standards, all therapists must provide the following documentation for verification:
              </p>
              
              <div className="space-y-6 mt-6">
                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                    1. Professional Qualifications
                  </h3>
                  <ul className="font-secondary text-text-secondary space-y-2">
                    <li>• Diploma or degree in counselling, psychotherapy, or psychology</li>
                    <li>• Certificates from accredited training institutions</li>
                    <li>• Evidence of continuing professional development (CPD)</li>
                  </ul>
                </div>

                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                    2. Professional Registration
                  </h3>
                  <ul className="font-secondary text-text-secondary space-y-2">
                    <li>• BACP (British Association for Counselling and Psychotherapy) membership</li>
                    <li>• UKCP (UK Council for Psychotherapy) registration</li>
                    <li>• BPS (British Psychological Society) membership (if applicable)</li>
                    <li>• HCPC registration (if applicable)</li>
                  </ul>
                </div>

                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                    3. Insurance and Legal Requirements
                  </h3>
                  <ul className="font-secondary text-text-secondary space-y-2">
                    <li>• Current professional indemnity insurance certificate</li>
                    <li>• Enhanced DBS (Disclosure and Barring Service) check</li>
                    <li>• Data protection compliance certificate</li>
                  </ul>
                </div>

                <div className="p-6 bg-surface border border-border rounded-lg">
                  <h3 className="font-primary text-xl font-semibold text-text-primary mb-3">
                    4. Supervision and Ethics
                  </h3>
                  <ul className="font-secondary text-text-secondary space-y-2">
                    <li>• Evidence of current clinical supervision arrangements</li>
                    <li>• Signed ethical framework agreement</li>
                    <li>• Professional code of ethics acknowledgment</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-primary text-2xl font-bold text-text-primary">
                Document Verification Process
              </h2>
              <div className="space-y-4">
                <p className="font-secondary text-text-secondary leading-relaxed">
                  All submitted documents undergo a thorough verification process:
                </p>
                <ol className="font-secondary text-text-secondary space-y-2 list-decimal list-inside">
                  <li>Initial document review within 2-3 business days</li>
                  <li>Verification with issuing bodies and professional organizations</li>
                  <li>Background checks and reference verification</li>
                  <li>Final approval and platform activation</li>
                </ol>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-primary text-2xl font-bold text-text-primary">
                Data Security and Privacy
              </h2>
              <p className="font-secondary text-text-secondary leading-relaxed">
                All submitted documents are handled in accordance with GDPR and UK data protection laws. 
                Documents are encrypted, stored securely, and only accessed by authorized verification staff. 
                We retain documentation only as long as necessary for regulatory compliance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-primary text-2xl font-bold text-text-primary">
                Contact Information
              </h2>
              <p className="font-secondary text-text-secondary leading-relaxed">
                For questions about document requirements or the verification process, please contact 
                our therapist support team at <a href="mailto:therapists@mindfolk.io" className="text-primary hover:underline">therapists@mindfolk.io</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </PublicPageLayout>
  );
}