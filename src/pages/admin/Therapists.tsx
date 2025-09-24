import { Container } from "@/components/ui/container";
import { AdminLayout } from "@/components/layout/admin-layout";
import { EnhancedVerificationQueue } from "@/components/admin/enhanced-verification-queue";

export default function AdminTherapists() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <EnhancedVerificationQueue />
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
