import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { TaskFilters } from "@/components/molecules/task-filters";
import { TaskList } from "@/components/organisms/task-list";
import { TaskItem as TaskItemType, TaskFilters as TaskFiltersType, TaskStats } from "@/types/tasks";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ListTodo, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface TaskHubShellProps {
  role: 'client' | 'therapist' | 'admin';
  tasks: TaskItemType[];
  stats: TaskStats;
  title: string;
  subtitle: string;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

const roleColors = {
  client: "text-jovial-jade",
  therapist: "text-garden-green", 
  admin: "text-btn-accent-foreground"
};

export function TaskHubShell({ 
  role, 
  tasks, 
  stats, 
  title, 
  subtitle, 
  loading, 
  error, 
  onRetry 
}: TaskHubShellProps) {
  const [activeTab, setActiveTab] = React.useState("all");
  const [filters, setFilters] = React.useState<TaskFiltersType>({
    status: [],
    priority: [],
    flow: [],
    search: ""
  });

  // Filter tasks by tab
  const getTabTasks = (tab: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (tab) {
      case "due-today":
        return tasks.filter(task => 
          task.due && 
          new Date(task.due) >= today && 
          new Date(task.due) < tomorrow &&
          task.status !== 'done'
        );
      case "overdue":
        return tasks.filter(task => 
          task.due && 
          new Date(task.due) < today &&
          task.status !== 'done'
        );
      case "completed":
        return tasks.filter(task => task.status === 'done');
      default:
        return tasks.filter(task => task.status !== 'done');
    }
  };

  const tabTasks = getTabTasks(activeTab);

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${roleColors[role]}`}>
          {title}
        </h1>
        <p className="text-text-secondary text-lg">{subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Card className="flex-1 min-w-[200px] p-4">
          <div className="flex items-center gap-3">
            <ListTodo className="h-8 w-8 text-garden-green" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
              <p className="text-sm text-text-secondary">Total Tasks</p>
            </div>
          </div>
        </Card>
        
        <Card className="flex-1 min-w-[200px] p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-garden-green" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.dueToday}</p>
              <p className="text-sm text-text-secondary">Due Today</p>
            </div>
          </div>
        </Card>
        
        <Card className="flex-1 min-w-[200px] p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-garden-green" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.overdue}</p>
              <p className="text-sm text-text-secondary">Overdue</p>
            </div>
          </div>
        </Card>
        
        <Card className="flex-1 min-w-[200px] p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-garden-green" />
            <div>
              <p className="text-2xl font-bold text-text-primary">{stats.completed}</p>
              <p className="text-sm text-text-secondary">Completed</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            {stats.total > 0 && (
              <Badge variant="secondary" className="ml-1">
                {stats.total}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="due-today" className="flex items-center gap-2">
            Due Today
            {stats.dueToday > 0 && (
              <Badge variant="secondary" className="ml-1">
                {stats.dueToday}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-2">
            Overdue
            {stats.overdue > 0 && (
              <Badge variant="destructive" className="ml-1">
                {stats.overdue}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            {stats.completed > 0 && (
              <Badge variant="outline" className="ml-1">
                {stats.completed}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <TaskFilters
              filters={filters}
              onFiltersChange={setFilters}
              role={role}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <TabsContent value="all">
              <TaskList
                tasks={tabTasks}
                filters={filters}
                loading={loading}
                error={error}
                onRetry={onRetry}
                role={role}
              />
            </TabsContent>
            
            <TabsContent value="due-today">
              <TaskList
                tasks={tabTasks}
                filters={filters}
                loading={loading}
                error={error}
                onRetry={onRetry}
                role={role}
              />
            </TabsContent>
            
            <TabsContent value="overdue">
              <TaskList
                tasks={tabTasks}
                filters={filters}
                loading={loading}
                error={error}
                onRetry={onRetry}
                role={role}
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <TaskList
                tasks={tabTasks}
                filters={filters}
                loading={loading}
                error={error}
                onRetry={onRetry}
                role={role}
              />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </Container>
  );
}