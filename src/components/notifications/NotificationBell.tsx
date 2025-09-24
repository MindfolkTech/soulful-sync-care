import * as React from "react";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

export function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [items, setItems] = React.useState<NotificationItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadNotifications = React.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data: list } = await supabase
      .from("notifications")
      .select("id,title,message,created_at,read")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    setItems(list || []);

    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("read", false);

    setUnreadCount(count || 0);
    setLoading(false);
  }, [user]);

  React.useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  React.useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("notifications_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        (payload: any) => {
          const row = (payload.new || payload.old) as any;
          if (!row) return;
          // Only react to this user's notifications
          if (row.user_id && row.user_id !== user.id) return;
          loadNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, loadNotifications]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
    loadNotifications();
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Open notifications" className="min-h-[--touch-target-min] min-w-[--touch-target-min]">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 text-xs flex items-center justify-center rounded-full bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-md border bg-surface shadow-lg z-50">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="font-primary">Notifications</p>
            <Button variant="ghost" size="sm" onClick={markAllRead} disabled={loading || unreadCount === 0}>
              Mark all read
            </Button>
          </div>
          <div className="divide-y" role="list" aria-label="Notifications">
            {items.length === 0 && (
              <div className="p-4 text-sm text-[hsl(var(--text-secondary))]">No notifications</div>
            )}
            {items.map((n) => (
              <div key={n.id} className="p-3 hover:bg-[hsl(var(--surface-accent))]" role="listitem">
                <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{n.title}</p>
                <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{n.message}</p>
                <p className="text-xs text-[hsl(var(--text-secondary))] mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
