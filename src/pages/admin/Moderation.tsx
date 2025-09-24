import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ModerationActions } from "@/components/admin/ModerationActions";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";

interface ModerationItem {
  id: string;
  content_type: string;
  reason: string;
  status: string;
  created_at: string;
}

const useModerationQueue = () => {
  return useQuery<ModerationItem[], Error>({
    queryKey: ['moderation_queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('moderation_queue')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export default function Moderation() {
  const { data: items = [], isLoading, isError, error } = useModerationQueue();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]";
      case "resolved":
        return "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]";
      case "dismissed":
        return "bg-[hsl(var(--text-secondary))] text-[hsl(var(--on-dark))]";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center py-16"><Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--text-secondary))]" /></div>;
    }

    if (isError) {
      return (
        <div className="bg-error-bg border-error-text/50 p-6 rounded-md flex items-center gap-4">
            <AlertCircle className="h-8 w-8 text-error-text" />
            <div>
                <h3 className="font-bold text-error-text">Failed to load moderation queue</h3>
                <p className="text-sm text-error-text/90">{error.message}</p>
            </div>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-16">
          <ShieldCheck className="mx-auto h-12 w-12 text-[hsl(var(--success-text))] mb-2" />
          <h3 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))]">Queue is Clear</h3>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">No items are currently pending review.</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Content Type</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Reported At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.content_type}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeClass(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <ModerationActions itemId={item.id} currentStatus={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Content Moderation</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Review and manage flagged content</p>
            </div>
            <Card>
              <CardContent className="p-0">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
