import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { VerificationQueue } from "@/components/admin/verification-queue";

export default function AdminTherapists() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <VerificationQueue />
        </Container>
      </main>
      <Footer />
    </div>
  );
}