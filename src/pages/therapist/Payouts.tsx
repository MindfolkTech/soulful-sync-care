import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Download, 
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  BarChart3,
  Settings
} from "lucide-react";

export default function TherapistPayouts() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  
  // Mock earnings data
  const earnings = {
    currentMonth: {
      total: 2875.50,
      sessions: 23,
      hourlyRate: 125,
      pending: 425.00,
      available: 2450.50
    },
    lastMonth: {
      total: 3250.00,
      sessions: 26,
      hourlyRate: 125,
      pending: 0,
      available: 3250.00
    }
  };

  // Mock payout history
  const payoutHistory = [
    {
      id: "po_001",
      period: "January 2024",
      amount: 3250.00,
      sessions: 26,
      date: "2024-02-01",
      status: "completed",
      method: "Bank Transfer"
    },
    {
      id: "po_002", 
      period: "December 2023",
      amount: 2875.50,
      sessions: 23,
      date: "2024-01-01",
      status: "completed", 
      method: "Bank Transfer"
    },
    {
      id: "po_003",
      period: "November 2023",
      amount: 3500.00,
      sessions: 28,
      date: "2023-12-01",
      status: "completed",
      method: "Bank Transfer"
    }
  ];

  // Mock session breakdown
  const sessionBreakdown = [
    {
      client: "Alex Johnson",
      sessions: 4,
      rate: 125,
      total: 500,
      status: "completed"
    },
    {
      client: "Emma Wilson",
      sessions: 3,
      rate: 125, 
      total: 375,
      status: "completed"
    },
    {
      client: "Michael Chen",
      sessions: 4,
      rate: 125,
      total: 500,
      status: "pending"
    }
  ];

  // Mock tax information
  const taxInfo = {
    ytdEarnings: 28750,
    ytdTax: 7187.50,
    estimatedQuarterly: 1796.88,
    nextDue: "2024-04-15"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "secondary";
      case "pending": return "default";
      case "processing": return "default";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  const currentEarnings = selectedPeriod === "current" ? earnings.currentMonth : earnings.lastMonth;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Earnings & Payouts</h1>
          <p className="text-muted-foreground">
            Track your earnings, payouts, and financial performance
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">${earnings.currentMonth.total.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-2xl font-bold">{earnings.currentMonth.sessions}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold">${earnings.currentMonth.hourlyRate}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold">${earnings.currentMonth.available.toLocaleString()}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Earnings Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Earnings Overview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedPeriod === "current" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedPeriod("current")}
                    >
                      Current Month
                    </Button>
                    <Button 
                      variant={selectedPeriod === "last" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedPeriod("last")}
                    >
                      Last Month
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Available for Payout</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      ${currentEarnings.available.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Pending Sessions</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                      ${currentEarnings.pending.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next payout</span>
                    <span>{currentEarnings.sessions}/30 sessions</span>
                  </div>
                  <Progress value={(currentEarnings.sessions / 30) * 100} className="h-2" />
                </div>

                <Button className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Request Payout - ${currentEarnings.available.toLocaleString()}
                </Button>
              </CardContent>
            </Card>

            {/* Session Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Session Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="current" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="current">Current Month</TabsTrigger>
                    <TabsTrigger value="pending">Pending Payment</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="current" className="space-y-3">
                    {sessionBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{item.client}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.sessions} sessions × ${item.rate}/session
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.total}</div>
                          <Badge variant={getStatusColor(item.status)} className="text-xs">
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending">
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Sessions pending payment approval
                    </p>
                  </TabsContent>

                  <TabsContent value="completed">
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Completed and paid sessions
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Payout History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payout History
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{payout.period}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {payout.date}
                          <span>•</span>
                          <span>{payout.sessions} sessions</span>
                          <span>•</span>
                          <span>{payout.method}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">${payout.amount.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(payout.status)} className="text-xs">
                          {payout.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Monthly Earnings</span>
                  <span className="font-medium">$3,062</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Sessions/Month</span>
                  <span className="font-medium">25.7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Client Retention Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Platform Commission</span>
                  <span className="font-medium">15%</span>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Tax Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">YTD Earnings</span>
                    <span className="font-medium">${taxInfo.ytdEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Est. Tax Owed</span>
                    <span className="font-medium">${taxInfo.ytdTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quarterly Est.</span>
                    <span className="font-medium">${taxInfo.estimatedQuarterly.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900 dark:text-yellow-100">
                      Next Due: {taxInfo.nextDue}
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download 1099
                </Button>
              </CardContent>
            </Card>

            {/* Payout Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payout Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payout Method</span>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frequency</span>
                    <span>Monthly</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auto-payout</span>
                    <Badge variant="secondary" className="text-xs">Enabled</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}