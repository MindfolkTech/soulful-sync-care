import { Container } from "@/components/ui/container";
import { AdminLayout } from "@/components/layout/admin-layout";
import { VerificationQueue } from "@/components/admin/verification-queue";

export default function AdminTherapists() {
  return (
    <AdminLayout>
      <div className="p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Therapist Management</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Review and verify therapist applications</p>
            </div>
            <VerificationQueue />
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
