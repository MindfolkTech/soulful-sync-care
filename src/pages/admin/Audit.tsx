import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAudit() {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">System audit trails and compliance monitoring.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
