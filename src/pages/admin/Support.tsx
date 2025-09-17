import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSupport() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <Card>
            <CardHeader>
              <CardTitle className="font-primary">Support Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Support ticket management and user assistance tools.</p>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}