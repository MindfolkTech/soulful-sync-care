import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Eye } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import * as React from "react";

// --- START: Imports from original Earnings.tsx ---
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Download, CreditCard, Calendar, ArrowUp, ArrowDown } from "lucide-react";
// --- END: Imports from original Earnings.tsx ---

// --- START: Imports from original Analytics.tsx ---
import { Star } from "lucide-react";
// --- END: Imports from original Analytics.tsx ---

const EarningsView = () => {
    // State and data from original Earnings page
    const earningsData = { currentWeek: 640, lastWeek: 580, thisMonth: 2340, lastMonth: 2180, thisYear: 24500, lastYear: 19200 };
    const payoutMethods = [ { id: "1", type: "Bank Account", details: "****1234", isDefault: true, status: "active" }, { id: "2", type: "PayPal", details: "charlotte@email.com", isDefault: false, status: "active" } ];
    const recentTransactions = [ { id: "1", type: "session_payment", client: "Jessica D.", amount: 75, date: "2024-01-15", status: "completed" }, { id: "2", type: "session_payment", client: "Michael S.", amount: 75, date: "2024-01-14", status: "completed" }, { id: "3", type: "payout", client: "Weekly Payout", amount: -580, date: "2024-01-12", status: "completed" }, { id: "4", type: "session_payment", client: "Sarah L.", amount: 75, date: "2024-01-11", status: "pending" } ];
    const weeklyChange = ((earningsData.currentWeek - earningsData.lastWeek) / earningsData.lastWeek) * 100;
    const monthlyChange = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100;

    return (
        <Stack className="space-y-8">
            <HStack className="justify-end"><Button variant="outline" className="min-h-touch-min"><Download className="w-4 h-4 mr-2" />Export Report</Button><Button variant="primary" className="min-h-touch-min">Request Payout</Button></HStack>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">This Week</p><p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">£{earningsData.currentWeek}</p></div><div className={`flex items-center text-sm ${weeklyChange >= 0 ? 'text-[hsl(var(--success-text))]' : 'text-[hsl(var(--error-text))]'}`}>{weeklyChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}<span className="font-secondary font-medium">{Math.abs(weeklyChange).toFixed(1)}%</span></div></div></CardContent></Card>
                <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">This Month</p><p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">£{earningsData.thisMonth}</p></div><div className={`flex items-center text-sm ${monthlyChange >= 0 ? 'text-[hsl(var(--success-text))]' : 'text-[hsl(var(--error-text))]'}`}>{monthlyChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}<span className="font-secondary font-medium">{Math.abs(monthlyChange).toFixed(1)}%</span></div></div></CardContent></Card>
                <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">This Year</p><p className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">£{earningsData.thisYear.toLocaleString()}</p></div><div className="flex items-center text-sm text-[hsl(var(--success-text))]"><TrendingUp className="w-4 h-4" /><span className="font-secondary font-medium">27.6%</span></div></div></CardContent></Card>
            </div>
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="transactions">Transactions</TabsTrigger><TabsTrigger value="payouts">Payouts</TabsTrigger><TabsTrigger value="tax">Tax Documents</TabsTrigger></TabsList>
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Earnings Trend</CardTitle></CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center border-2 border-dashed border-[hsl(var(--border))] rounded-lg">
                                    <div className="text-center"><TrendingUp className="w-12 h-12 text-[hsl(var(--text-secondary))] mx-auto mb-2" /><p className="font-secondary text-[hsl(var(--text-secondary))]">Earnings chart would go here</p></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Session Breakdown</CardTitle></CardHeader>
                            <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between"><span className="font-secondary text-[hsl(var(--text-secondary))]">Chemistry Calls</span><span className="font-secondary font-semibold text-[hsl(var(--text-primary))]">12 × £15 = £180</span></div>
                                        <div className="flex items-center justify-between"><span className="font-secondary text-[hsl(var(--text-secondary))]">Therapy Sessions</span><span className="font-secondary font-semibold text-[hsl(var(--text-primary))]">31 × £75 = £2,325</span></div>
                                        <div className="flex items-center justify-between"><span className="font-secondary text-[hsl(var(--text-secondary))]">Follow-up Sessions</span><span className="font-secondary font-semibold text-[hsl(var(--text-primary))]">8 × £60 = £480</span></div>
                                        <div className="border-t pt-4">
                                            <div className="flex items-center justify-between"><span className="font-secondary font-semibold text-[hsl(var(--text-primary))]">Total Gross</span><span className="font-primary text-lg font-bold text-[hsl(var(--text-primary))]">£2,985</span></div>
                                            <div className="flex items-center justify-between text-sm text-[hsl(var(--text-secondary))] mt-1"><span>Platform Fee (15%)</span><span>-£447.75</span></div>
                                            <div className="flex items-center justify-between font-semibold text-[hsl(var(--success-text))] mt-2"><span>Net Earnings</span><span>£2,537.25</span></div>
                                        </div>
                                    </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="transactions" className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle className="font-primary text-jovial-jade">Recent Transactions</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            <div className="space-y-0">
                                {recentTransactions.map((transaction, index) => (
                                    <div key={transaction.id} className={`p-4 md:p-5 lg:p-6 ${index !== recentTransactions.length - 1 ? 'border-b border-border' : ''}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${transaction.type === 'payout' ? 'bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]' : 'bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]'}`}>{transaction.type === 'payout' ? <Download className="w-4 h-4 sm:w-5 sm:h-5" /> : <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}</div>
                                                <div>
                                                    <p className="font-secondary font-semibold text-foreground">{transaction.client}</p>
                                                    <p className="font-secondary text-muted-foreground text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-secondary font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>{transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount)}</p>
                                                <Badge variant={transaction.status === 'completed' ? 'secondary' : 'outline'} className={transaction.status === 'completed' ? 'bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]' : ''}>{transaction.status}</Badge>
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
                        <CardHeader><HStack className="justify-between"><CardTitle className="font-primary text-jovial-jade">Payout Methods</CardTitle><Button variant="outline" size="sm" className="min-h-touch-min">Add Method</Button></HStack></CardHeader>
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
                                        <div className="flex items-center gap-2">{method.isDefault && (<Badge variant="secondary" className="bg-green-100 text-green-800">Default</Badge>)}<Button variant="ghost" size="sm" className="min-h-touch-min">Edit</Button></div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tax" className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="font-primary text-jovial-jade">Tax Documents</CardTitle></CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-primary font-semibold text-foreground mb-2">Tax documents will be available at year-end</h3>
                                <p className="font-secondary text-muted-foreground text-sm">Your 1099 and other tax documents will be generated automatically in January</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </Stack>
    );
};

const AnalyticsView = () => {
    // State and data from original Analytics page
    const kpis = [ { title: "Profile Views", value: "127", change: "+12%", trend: "up", period: "vs last month", icon: Eye }, { title: "Sessions Booked", value: "43", change: "+8%", trend: "up", period: "vs last month", icon: Calendar }, { title: "Client Favorites", value: "28", change: "+15%", trend: "up", period: "vs last month", icon: Star }, { title: "Average Rating", value: "4.9", change: "+0.1", trend: "up", period: "vs last month", icon: Star } ];
    const improvements = [ { title: "Add professional video", description: "Profiles with videos get 3x more bookings", impact: "High", action: "Upload Video" }, { title: "Update availability", description: "More evening slots could increase bookings", impact: "Medium", action: "Add Hours" }, { title: "Gather more reviews", description: "Request feedback from recent clients", impact: "Low", action: "Send Requests" } ];
    
    return (
        <Stack className="space-y-8">
            <HStack className="justify-end"><select className="px-3 py-2 border rounded-md bg-background font-secondary text-foreground min-h-touch-min"><option>Last 30 days</option></select><Button variant="outline" className="min-h-touch-min">Export Report</Button></HStack>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi) => { const IconComponent = kpi.icon; const TrendIcon = kpi.trend === "up" ? ArrowUp : ArrowDown; const trendColor = kpi.trend === "up" ? "text-green-600" : "text-red-600"; return (<Card key={kpi.title}><CardContent className="p-6"><div className="flex items-center justify-between"><div className="flex items-center space-x-2"><IconComponent className="w-5 h-5 text-jovial-jade" /><span className="font-secondary text-muted-foreground text-sm">{kpi.title}</span></div><div className={`flex items-center space-x-1 text-sm ${trendColor}`}><TrendIcon className="w-4 h-4" /><span className="font-secondary font-medium">{kpi.change}</span></div></div><div className="mt-2"><div className="font-primary text-2xl font-bold text-foreground">{kpi.value}</div><div className="font-secondary text-muted-foreground text-xs mt-1">{kpi.period}</div></div></CardContent></Card>);})}
            </div>
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="bookings">Bookings</TabsTrigger><TabsTrigger value="revenue">Revenue</TabsTrigger><TabsTrigger value="clients">Clients</TabsTrigger></TabsList>
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Profile Views Over Time</CardTitle></CardHeader>
                            <CardContent><div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg"><div className="text-center"><TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" /><p className="font-secondary text-muted-foreground">Chart visualization would go here</p></div></div></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Booking Conversion</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Profile Views</span><span className="font-secondary font-semibold text-foreground">127</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Favorites Added</span><span className="font-secondary font-semibold text-foreground">28</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Sessions Booked</span><span className="font-secondary font-semibold text-foreground">43</span></div>
                                    <div className="border-t pt-4"><div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Conversion Rate</span><span className="font-secondary font-semibold text-green-600">33.9%</span></div></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="bookings" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Response Times</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Avg First Response</span><span className="font-secondary font-semibold text-foreground">2h 15m</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Response Rate</span><span className="font-secondary font-semibold text-foreground">98%</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Weekend Response</span><span className="font-secondary font-semibold text-foreground">4h 30m</span></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Session Types</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Chemistry Calls</span><span className="font-secondary font-semibold text-foreground">12</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Therapy Sessions</span><span className="font-secondary font-semibold text-foreground">31</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Follow-ups</span><span className="font-secondary font-semibold text-foreground">8</span></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Client Satisfaction</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="font-secondary font-semibold text-foreground">4.9</span></div></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Total Reviews</span><span className="font-secondary font-semibold text-foreground">27</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Response Rate</span><span className="font-secondary font-semibold text-foreground">92%</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="revenue" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Revenue Breakdown</CardTitle></CardHeader>
                            <CardContent><div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg"><div className="text-center"><DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-2" /><p className="font-secondary text-muted-foreground">Revenue chart would go here</p></div></div></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-primary text-jovial-jade">Earnings Summary</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">This Month</span><span className="font-secondary font-semibold text-foreground">£2,340</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Last Month</span><span className="font-secondary font-semibold text-foreground">£2,180</span></div>
                                    <div className="flex items-center justify-between"><span className="font-secondary text-muted-foreground">Average per Session</span><span className="font-secondary font-semibold text-foreground">£75</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="clients" className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="font-primary text-jovial-jade">Growth Opportunities</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {improvements.map((improvement, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex-1">
                                            <h4 className="font-secondary font-semibold text-foreground">{improvement.title}</h4>
                                            <p className="font-secondary text-muted-foreground text-sm mt-1">{improvement.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant={improvement.impact === "High" ? "destructive" : improvement.impact === "Medium" ? "secondary" : "outline"}>{improvement.impact}</Badge>
                                            <Button variant="outline" size="sm" className="min-h-touch-min">{improvement.action}</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </Stack>
    );
};

export default function TherapistBusiness() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
            <div className="space-y-4">
                <div className="space-y-1">
                    <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))]">Business & Analytics</h1>
                    <p className="font-secondary text-[hsl(var(--text-secondary))]">Track your income, performance, and growth opportunities.</p>
                </div>
                <Tabs value={activeTab} onValueChange={(value) => setSearchParams({ tab: value })} className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview"><Eye className="w-4 h-4 mr-2" /> Overview</TabsTrigger>
                        <TabsTrigger value="analytics"><BarChart2 className="w-4 h-4 mr-2" /> Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                        <EarningsView />
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4">
                        <AnalyticsView />
                    </TabsContent>
                </Tabs>
            </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
