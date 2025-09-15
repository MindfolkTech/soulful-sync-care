import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ModerationTable } from "@/components/admin/moderation-table";

export default function AdminModeration() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <ModerationTable />
        </Container>
      </main>
      <Footer />
    </div>
  );
}