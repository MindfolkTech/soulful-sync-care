import { PageShell } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/container";

export default function Privacy() {
  return (
    <PageShell>
      <div className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))] mb-8">
              Privacy Policy
            </h1>
            
            <div className="space-y-8 font-secondary text-[hsl(var(--text-secondary))]">
              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  1. Data Controller Information
                </h2>
                <div className="space-y-2">
                  <p><strong>Company:</strong> MindFolk Ltd</p>
                  <p><strong>Address:</strong> 123 Therapy Street, London, UK</p>
                  <p><strong>Email:</strong> privacy@mindfolk.com</p>
                  <p><strong>Phone:</strong> +44 20 1234 5678</p>
                  <p><strong>Data Protection Officer:</strong> dpo@mindfolk.com</p>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  2. Data We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Personal Information</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Name, email address, phone number</li>
                      <li>Date of birth and gender</li>
                      <li>Profile photos and video introductions</li>
                      <li>Payment and billing information</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Health Data (Special Category)</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Mental health assessment responses</li>
                      <li>Therapy session notes and messages</li>
                      <li>Treatment preferences and goals</li>
                      <li>Medical history relevant to therapy</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Technical Data</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>IP address and browser information</li>
                      <li>Device type and operating system</li>
                      <li>Usage patterns and analytics</li>
                      <li>Cookies and similar technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  3. Legal Basis for Processing
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Consent (Article 6(1)(a))</h3>
                    <p>Marketing communications, optional data collection, and non-essential cookies</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Contract (Article 6(1)(b))</h3>
                    <p>Service delivery, therapist matching, session booking, and payment processing</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Legitimate Interest (Article 6(1)(f))</h3>
                    <p>Service improvement, fraud prevention, and platform security</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Vital Interests (Article 9(2)(c))</h3>
                    <p>Emergency situations where health data processing is necessary to protect vital interests</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  4. How We Use Your Data
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Primary Purposes</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Matching you with compatible therapists</li>
                      <li>Facilitating therapy sessions and communication</li>
                      <li>Processing payments and managing subscriptions</li>
                      <li>Providing customer support</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Secondary Purposes</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Improving our matching algorithms</li>
                      <li>Analyzing platform usage and performance</li>
                      <li>Conducting research (with anonymized data)</li>
                      <li>Legal compliance and safety measures</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  5. Data Sharing and Third Parties
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Service Providers</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li><strong>Stripe:</strong> Payment processing</li>
                      <li><strong>Daily.co:</strong> Video session technology</li>
                      <li><strong>Resend:</strong> Email communications</li>
                      <li><strong>Twilio:</strong> SMS notifications</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Legal Requirements</h3>
                    <p>We may share data when required by law, court order, or to protect our rights and safety.</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Business Transfers</h3>
                    <p>In case of merger or acquisition, user data may be transferred to the new entity.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  6. Data Retention
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Account Data</h3>
                    <p>Retained until account deletion or 3 years of inactivity</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Therapy Data</h3>
                    <p>Retained for 7 years (legal requirement for healthcare records)</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Analytics Data</h3>
                    <p>Anonymized data retained for 2 years for service improvement</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Marketing Data</h3>
                    <p>Retained until consent is withdrawn</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  7. Your Rights Under GDPR
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Right of Access (Article 15)</h3>
                    <p>Request a copy of all personal data we hold about you</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Right to Rectification (Article 16)</h3>
                    <p>Correct inaccurate or incomplete personal data</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Right to Erasure (Article 17)</h3>
                    <p>Request deletion of your personal data in certain circumstances</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Right to Data Portability (Article 20)</h3>
                    <p>Receive your data in a structured, machine-readable format</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Right to Object (Article 21)</h3>
                    <p>Object to processing based on legitimate interests or for marketing</p>
                  </div>
                  
                  <div className="p-4 bg-background border rounded-lg">
                    <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">Right to Restrict Processing (Article 18)</h3>
                    <p>Limit how we process your data in certain circumstances</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-[hsl(var(--garden-green))]/10 border border-[hsl(var(--garden-green))] rounded-lg">
                  <p className="font-secondary text-[hsl(var(--text-primary))]">
                    <strong>Exercise Your Rights:</strong> You can manage most of these rights directly in your account settings, 
                    or contact us at <a href="mailto:privacy@mindfolk.com" className="text-primary hover:underline">privacy@mindfolk.com</a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  8. Data Security
                </h2>
                <div className="space-y-3">
                  <ul className="list-disc ml-6 space-y-1">
                    <li>End-to-end encryption for all communications</li>
                    <li>Secure data storage with industry-standard encryption</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and authentication measures</li>
                    <li>Staff training on data protection</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  9. International Transfers
                </h2>
                <p>
                  Some of our service providers may be located outside the UK/EEA. We ensure appropriate safeguards 
                  are in place, including Standard Contractual Clauses and adequacy decisions, to protect your data 
                  in accordance with UK GDPR requirements.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  10. Cookies and Tracking
                </h2>
                <div className="space-y-3">
                  <p>We use cookies and similar technologies for:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Essential:</strong> Site functionality and security</li>
                    <li><strong>Analytics:</strong> Understanding usage patterns (with consent)</li>
                    <li><strong>Marketing:</strong> Personalized content (with consent)</li>
                  </ul>
                  <p>You can manage cookie preferences through our consent banner or account settings.</p>
                </div>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  11. Children's Privacy
                </h2>
                <p>
                  Our service is not intended for children under 16. We do not knowingly collect personal information 
                  from children under 16. If we become aware that we have collected such data, we will delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  12. Changes to This Policy
                </h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of significant changes 
                  via email or through our platform. The "Last Updated" date at the bottom of this policy indicates 
                  when it was last revised.
                </p>
              </section>

              <section>
                <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
                  13. Contact Information
                </h2>
                <div className="space-y-2">
                  <p><strong>Data Protection Officer:</strong> dpo@mindfolk.com</p>
                  <p><strong>General Privacy Inquiries:</strong> privacy@mindfolk.com</p>
                  <p><strong>Postal Address:</strong> MindFolk Ltd, 123 Therapy Street, London, UK</p>
                  <p><strong>Supervisory Authority:</strong> Information Commissioner's Office (ICO)</p>
                  <p><strong>ICO Website:</strong> <a href="https://ico.org.uk" className="text-primary hover:underline">ico.org.uk</a></p>
                </div>
              </section>

              <div className="pt-6 border-t text-sm text-[hsl(var(--text-secondary))]">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-GB')}</p>
                <p><strong>Version:</strong> 2.0</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageShell>
  );
}
