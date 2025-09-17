import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  CreditCard,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function TherapistEarnings() {
  const earningsData = {
    currentWeek: 640,
    lastWeek: 580,
    thisMonth: 2340,
    lastMonth: 2180,
    thisYear: 24500,
    lastYear: 19200
  };

  const payoutMethods = [
    {
      id: "1",
      type: "Bank Account",
      details: "****1234",
      isDefault: true,
      status: "active"
    },
    {
      id: "2", 
      type: "PayPal",
      details: "charlotte@email.com",
      isDefault: false,
      status: "active"
    }
  ];

  const recentTransactions = [
    {
      id: "1",
      type: "session_payment",
      client: "Jessica D.",
      amount: 75,
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "2",
      type: "session_payment", 
      client: "Michael S.",
      amount: 75,
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: "3",
      type: "payout",
      client: "Weekly Payout",
      amount: -580,
      date: "2024-01-12",
      status: "completed"
    },
    {
      id: "4",
      type: "session_payment",
      client: "Sarah L.",
      amount: 75,
      date: "2024-01-11", 
      status: "pending"
    }
  ];

  const weeklyChange = ((earningsData.currentWeek - earningsData.lastWeek) / earningsData.lastWeek) * 100;
  const monthlyChange = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100;

  return (
    <DashboardLayout 
      title="Earnings Dashboard"
      subtitle="Track your income and manage payouts"
    >
      <Stack className="space-y-8">
        {/* Action Buttons */}
        <HStack className="justify-end">
          <Button variant="outline" className="min-h-touch-min">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-garden-green text-white hover:bg-elated-emerald min-h-touch-min">
            Request Payout
          </Button>
        </HStack>

        {/* Earnings Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-secondary text-muted-foreground text-sm">This Week</p>
                  <p className="font-primary text-2xl font-bold text-foreground">£{earningsData.currentWeek}</p>
                </div>
                <div className={`flex items-center text-sm ${weeklyChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {weeklyChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="font-secondary font-medium">{Math.abs(weeklyChange).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-secondary text-muted-foreground text-sm">This Month</p>
                  <p className="font-primary text-2xl font-bold text-foreground">£{earningsData.thisMonth}</p>
                </div>
                <div className={`flex items-center text-sm ${monthlyChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {monthlyChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span className="font-secondary font-medium">{Math.abs(monthlyChange).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-secondary text-muted-foreground text-sm">This Year</p>
                  <p className="font-primary text-2xl font-bold text-foreground">£{earningsData.thisYear.toLocaleString()}</p>
                </div>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-secondary font-medium">27.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="tax">Tax Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-jovial-jade">Earnings Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="font-secondary text-muted-foreground">Earnings chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-jovial-jade">Session Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-secondary text-muted-foreground">Chemistry Calls</span>
                      <span className="font-secondary font-semibold text-foreground">12 × £15 = £180</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-secondary text-muted-foreground">Therapy Sessions</span>
                      <span className="font-secondary font-semibold text-foreground">31 × £75 = £2,325</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-secondary text-muted-foreground">Follow-up Sessions</span>
                      <span className="font-secondary font-semibold text-foreground">8 × £60 = £480</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-secondary font-semibold text-foreground">Total Gross</span>
                        <span className="font-primary text-lg font-bold text-foreground">£2,985</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                        <span>Platform Fee (15%)</span>
                        <span>-£447.75</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold text-success mt-2">
                        <span>Net Earnings</span>
                        <span>£2,537.25</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-jovial-jade">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentTransactions.map((transaction, index) => (
                    <div 
                      key={transaction.id}
                      className={`p-4 md:p-5 lg:p-6 ${index !== recentTransactions.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'payout' ? 'bg-warning text-foreground' : 'bg-success text-white'
                          }`}>
                            {transaction.type === 'payout' ? 
                              <Download className="w-4 h-4" /> : 
                              <DollarSign className="w-4 h-4" />
                            }
                          </div>
                          <div>
                            <p className="font-secondary font-semibold text-foreground">
                              {transaction.client}
                            </p>
                            <p className="font-secondary text-muted-foreground text-sm">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-secondary font-semibold ${
                            transaction.amount > 0 ? 'text-success' : 'text-foreground'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount)}
                          </p>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'secondary' : 'outline'}
                            className={transaction.status === 'completed' ? 'bg-success text-white' : ''}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-6">
            <Card>
              <CardHeader>
                <HStack className="justify-between">
                  <CardTitle className="font-primary text-jovial-jade">Payout Methods</CardTitle>
                  <Button variant="outline" size="sm" className="min-h-touch-min">
                    Add Method
                  </Button>
                </HStack>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payoutMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-muted-foreground" />
                        <div>
                          <p className="font-secondary font-semibold text-foreground">{method.type}</p>
                          <p className="font-secondary text-muted-foreground text-sm">{method.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary" className="bg-success text-white">Default</Badge>
                        )}
                        <Button variant="ghost" size="sm" className="min-h-touch-min">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-primary text-jovial-jade">Tax Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-primary font-semibold text-foreground mb-2">
                    Tax documents will be available at year-end
                  </h3>
                  <p className="font-secondary text-muted-foreground text-sm">
                    Your 1099 and other tax documents will be generated automatically in January
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Stack>
    </DashboardLayout>
  );
}