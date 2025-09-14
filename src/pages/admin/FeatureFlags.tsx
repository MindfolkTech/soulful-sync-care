import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminFeatureFlags() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <Card>
            <CardHeader>
              <CardTitle className="font-primary">Feature Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-secondary text-text-secondary">Feature flag management and A/B testing controls.</p>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}