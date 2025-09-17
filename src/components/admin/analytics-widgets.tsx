import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Download, RefreshCw } from "lucide-react";

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--garden-green))",
  },
  sessions: {
    label: "Sessions", 
    color: "hsl(var(--elated-emerald))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--jovial-jade))",
  },
  therapists: {
    label: "Therapists",
    color: "hsl(var(--tag-specialty-bg))",
  },
};

// Mock data
const weeklyData = [
  { day: "Mon", users: 145, sessions: 89, revenue: 2840 },
  { day: "Tue", users: 167, sessions: 123, revenue: 3920 },
  { day: "Wed", users: 189, sessions: 145, revenue: 4650 },
  { day: "Thu", users: 203, sessions: 167, revenue: 5340 },
  { day: "Fri", users: 234, sessions: 189, revenue: 6050 },
  { day: "Sat", users: 198, sessions: 134, revenue: 4280 },
  { day: "Sun", users: 156, sessions: 98, revenue: 3140 },
];

const monthlyGrowthData = [
  { month: "Jan", users: 1200, therapists: 45, sessions: 890 },
  { month: "Feb", users: 1450, therapists: 52, sessions: 1120 },
  { month: "Mar", users: 1680, therapists: 58, sessions: 1340 },
  { month: "Apr", users: 1890, therapists: 64, sessions: 1580 },
  { month: "May", users: 2100, therapists: 71, sessions: 1820 },
  { month: "Jun", users: 2340, therapists: 78, sessions: 2080 },
];

const therapistSpecialtyData = [
  { name: "Anxiety", value: 34, color: "hsl(var(--tag-specialty-bg))" },
  { name: "Depression", value: 28, color: "hsl(var(--tag-personality-bg))" },
  { name: "Couples", value: 18, color: "hsl(var(--tag-modality-bg))" },
  { name: "Trauma", value: 12, color: "hsl(var(--tag-language-bg))" },
  { name: "Other", value: 8, color: "hsl(var(--tag-misc-bg))" },
];

const userRetentionData = [
  { week: "Week 1", retained: 100 },
  { week: "Week 2", retained: 87 },
  { week: "Week 3", retained: 76 },
  { week: "Week 4", retained: 68 },
  { week: "Week 8", retained: 58 },
  { week: "Week 12", retained: 52 },
];

interface AnalyticsWidgetsProps {
  className?: string;
}

export function AnalyticsWidgets({ className }: AnalyticsWidgetsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Users"
          value="2,847"
          change={12.5}
          trend="up"
          icon={Users}
          description="Active users this month"
        />
        <KPICard
          title="Active Therapists"
          value="127"
          change={8.2}
          trend="up"
          icon={Activity}
          description="Verified and active"
        />
        <KPICard
          title="Sessions Booked"
          value="1,456"
          change={-3.1}
          trend="down"
          icon={Calendar}
          description="This month"
        />
        <KPICard
          title="Monthly Revenue"
          value="$48,650"
          change={15.8}
          trend="up"
          icon={DollarSign}
          description="Gross revenue"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-primary">Weekly Activity</CardTitle>
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">User engagement and sessions</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--text-secondary))" fontSize={12} />
                  <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="hsl(var(--garden-green))"
                    fill="hsl(var(--garden-green))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stackId="1"
                    stroke="hsl(var(--elated-emerald))"
                    fill="hsl(var(--elated-emerald))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-primary">Growth Trends</CardTitle>
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">6-month overview</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--text-secondary))" fontSize={12} />
                  <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--garden-green))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--garden-green))", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="therapists"
                    stroke="hsl(var(--elated-emerald))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--elated-emerald))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Therapist Specialties */}
        <Card>
          <CardHeader>
            <CardTitle className="font-primary">Therapist Specialties</CardTitle>
            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Distribution of expertise areas</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={therapistSpecialtyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {therapistSpecialtyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2">
              {therapistSpecialtyData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Retention */}
        <Card>
          <CardHeader>
            <CardTitle className="font-primary">User Retention</CardTitle>
            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Percentage of users retained over time</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userRetentionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--text-secondary))" fontSize={12} />
                  <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="retained" 
                    fill="hsl(var(--garden-green))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="space-y-2">
              {userRetentionData.slice(0, 3).map((item) => (
                <div key={item.week} className="flex items-center justify-between">
                  <span className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{item.week}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={item.retained} className="w-20 h-2" />
                    <span className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))]">
                      {item.retained}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Platform Health</CardTitle>
          <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Real-time system metrics</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <HealthMetric
              label="Uptime"
              value="99.9%"
              status="healthy"
              description="Last 30 days"
            />
            <HealthMetric
              label="Response Time"
              value="180ms"
              status="healthy"
              description="Average API response"
            />
            <HealthMetric
              label="Error Rate"
              value="0.02%"
              status="healthy"
              description="Last 24 hours"
            />
            <HealthMetric
              label="Active Sessions"
              value="1,247"
              status="warning"
              description="Current connections"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

function KPICard({ title, value, change, trend, icon: Icon, description }: KPICardProps) {
  const isPositive = trend === "up";
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-[hsl(var(--surface-accent))] flex items-center justify-center">
              <Icon className="h-5 w-5 text-[hsl(var(--text-primary))]" />
            </div>
            <div>
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{title}</p>
              <p className="font-primary text-2xl font-semibold text-[hsl(var(--text-primary))]">{value}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isPositive 
              ? 'bg-[hsl(var(--success-bg))]/10 text-success' 
              : 'bg-[hsl(var(--error-bg))]/10 text-destructive'
          }`}>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span className="font-secondary text-sm font-medium">
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}

interface HealthMetricProps {
  label: string;
  value: string;
  status: "healthy" | "warning" | "critical";
  description: string;
}

function HealthMetric({ label, value, status, description }: HealthMetricProps) {
  const getStatusColor = () => {
    switch (status) {
      case "healthy":
        return "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]";
      case "warning":
        return "bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]";
      case "critical":
        return "bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]";
    }
  };

  return (
    <div className="text-center space-y-2">
      <Badge variant="secondary" className={getStatusColor()}>
        {status}
      </Badge>
      <div>
        <p className="font-primary text-2xl font-semibold text-[hsl(var(--text-primary))]">{value}</p>
        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{label}</p>
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{description}</p>
      </div>
    </div>
  );
}