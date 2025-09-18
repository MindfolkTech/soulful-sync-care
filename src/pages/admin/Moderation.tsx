import { AdminLayout } from "@/components/layout/admin-layout";
import { ModerationTable } from "@/components/admin/moderation-table";

export default function AdminModeration() {
  return (
    <AdminLayout>
      <ModerationTable />
    </AdminLayout>
  );
}
