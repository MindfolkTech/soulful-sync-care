import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Users, UserCheck, Calendar, DollarSign, FileText, Flag, Webhook, ExternalLink, CheckSquare, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminOverview() {
  return (
    <AdminLayout>
      <div className="p-8">
        <Container>
          <h1 className="font-primary text-3xl font-bold text-[hsl(var(--text-primary))] mb-8">Admin Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Total Users</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">1,247</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Active Therapists</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">89</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-[hsl(var(--success-text))]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Sessions Today</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">156</p>
                  </div>
                  <Calendar className="w-8 h-8 text-[hsl(var(--warning-text))]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Revenue</p>
                    <p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">£12.4K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-info" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Hub Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))]">Task Hub</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/tasks" className="flex items-center gap-2">
                  View All Tasks
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="min-w-0 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--error-bg))] flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-[hsl(var(--error-text))]" />
                    </div>
                    <div>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Urgent Tasks</p>
                      <p className="font-primary text-xl font-bold text-[hsl(var(--text-primary))]">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="min-w-0 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--warning-bg))] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[hsl(var(--warning-text))]" />
                    </div>
                    <div>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Due Today</p>
                      <p className="font-primary text-xl font-bold text-[hsl(var(--text-primary))]">7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="min-w-0 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--success-bg))] flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-[hsl(var(--success-text))]" />
                    </div>
                    <div>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Completed</p>
                      <p className="font-primary text-xl font-bold text-[hsl(var(--text-primary))]">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="min-w-0 overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="font-primary text-lg">Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--surface-accent))] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--error-bg))]"></div>
                    <div className="flex-1">
                      <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Review therapist applications</p>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">3 pending applications need verification</p>
                    </div>
                    <span className="font-secondary text-xs text-[hsl(var(--error-text))] bg-[hsl(var(--error-bg))] px-2 py-1 rounded">Urgent</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--surface-accent))] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--warning-bg))]"></div>
                    <div className="flex-1">
                      <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Moderate flagged content</p>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">2 items in moderation queue</p>
                    </div>
                    <span className="font-secondary text-xs text-[hsl(var(--text-secondary))]">Due today</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--surface-accent))] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--jovial-jade))]"></div>
                    <div className="flex-1">
                      <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Update system documentation</p>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Admin guide needs quarterly review</p>
                    </div>
                    <span className="font-secondary text-xs text-[hsl(var(--text-secondary))]">This week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Tools Section */}
          <div className="mt-12">
            <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-6">Advanced Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" asChild className="h-auto p-4 justify-start">
                <Link to="/admin/audit" className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[hsl(var(--text-secondary))]" />
                  <div className="text-left">
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Audit Logs</p>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">System activity logs</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-[hsl(var(--text-secondary))]" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="h-auto p-4 justify-start">
                <Link to="/admin/feature-flags" className="flex items-center gap-3">
                  <Flag className="w-5 h-5 text-[hsl(var(--text-secondary))]" />
                  <div className="text-left">
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Feature Flags</p>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Control feature rollouts</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-[hsl(var(--text-secondary))]" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="h-auto p-4 justify-start">
                <Link to="/admin/webhooks" className="flex items-center gap-3">
                  <Webhook className="w-5 h-5 text-[hsl(var(--text-secondary))]" />
                  <div className="text-left">
                    <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">Webhooks</p>
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">API integrations</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-[hsl(var(--text-secondary))]" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
