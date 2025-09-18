import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBookings() {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">System-wide booking oversight and management.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
