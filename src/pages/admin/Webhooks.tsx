import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminWebhooks() {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Webhook Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Integration monitoring and webhook management.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
