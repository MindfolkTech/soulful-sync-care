export interface TaskItem {
  id: string;
  title: string;
  role: 'client' | 'therapist' | 'admin';
  flow: 'assessment' | 'discovery' | 'booking' | 'session' | 'verification' | 'moderation' | 'payouts' | 'support';
  due: Date | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  cta: {
    label: string;
    href: string;
  };
  meta: {
    badges?: string[];
    slaMinutes?: number;
  };
}

export interface TaskFilters {
  status: TaskItem['status'][];
  priority: TaskItem['priority'][];
  flow: TaskItem['flow'][];
  search: string;
}

export interface TaskStats {
  total: number;
  dueToday: number;
  overdue: number;
  completed: number;
}
