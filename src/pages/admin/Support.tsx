import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSupport() {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Support Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Support ticket management and user assistance tools.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
