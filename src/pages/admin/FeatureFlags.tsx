import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminFeatureFlags() {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Feature Flags</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Feature flag management and A/B testing controls.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
