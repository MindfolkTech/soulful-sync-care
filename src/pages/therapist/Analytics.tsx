import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Eye, Users, DollarSign, Calendar, Star, ArrowUp, ArrowDown } from "lucide-react";

export default function TherapistAnalytics() {
  const kpis = [
    {
      title: "Profile Views",
      value: "127",
      change: "+12%",
      trend: "up",
      period: "vs last month",
      icon: Eye
    },
    {
      title: "Sessions Booked", 
      value: "43",
      change: "+8%", 
      trend: "up",
      period: "vs last month",
      icon: Calendar
    },
    {
      title: "Client Favorites",
      value: "28",
      change: "+15%",
      trend: "up", 
      period: "vs last month",
      icon: Star
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "+0.1",
      trend: "up",
      period: "vs last month", 
      icon: Star
    }
  ];

  const improvements = [
    {
      title: "Add professional video",
      description: "Profiles with videos get 3x more bookings",
      impact: "High",
      action: "Upload Video"
    },
    {
      title: "Update pricing strategy",
      description: "Consider competitive pricing in your area",
      impact: "Medium",
      action: "Review Rates"
    },
    {
      title: "Expand availability", 
      description: "More evening slots could increase bookings",
      impact: "Medium",
      action: "Add Hours"
    },
    {
      title: "Gather more reviews",
      description: "Request feedback from recent clients",
      impact: "Low",
      action: "Send Requests"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-primary text-3xl font-bold text-text-primary">
                  Analytics & Insights
                </h1>
                <p className="font-secondary text-text-secondary mt-2">
                  Track your practice performance and growth opportunities
                </p>
              </div>
              <div className="flex space-x-3">
                <select className="px-3 py-2 border rounded-md bg-background font-secondary text-text-primary">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
                <Button variant="outline">Export Report</Button>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi) => {
                const IconComponent = kpi.icon;
                const TrendIcon = kpi.trend === "up" ? ArrowUp : ArrowDown;
                const trendColor = kpi.trend === "up" ? "text-success" : "text-destructive";
                
                return (
                  <Card key={kpi.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-secondary text-text-secondary text-sm">
                            {kpi.title}
                          </p>
                          <p className="font-primary text-2xl font-bold text-text-primary">
                            {kpi.value}
                          </p>
                          <div className={`flex items-center space-x-1 mt-1 ${trendColor}`}>
                            <TrendIcon className="w-3 h-3" />
                            <span className="font-secondary text-xs font-semibold">
                              {kpi.change}
                            </span>
                            <span className="font-secondary text-text-muted text-xs">
                              {kpi.period}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Growth Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Growth Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {improvements.map((improvement, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-secondary font-semibold text-text-primary text-sm">
                              {improvement.title}
                            </h4>
                            <p className="font-secondary text-text-secondary text-xs mt-1">
                              {improvement.description}
                            </p>
                            <Badge 
                              variant={
                                improvement.impact === "High" ? "default" :
                                improvement.impact === "Medium" ? "secondary" : "outline"
                              }
                              className="mt-2 text-xs"
                            >
                              {improvement.impact} Impact
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline" className="ml-4">
                            {improvement.action}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-surface-accent/50 rounded-lg">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-secondary text-text-primary text-sm">
                            New client booking
                          </p>
                          <p className="font-secondary text-text-muted text-xs">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-surface-accent/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-secondary text-text-primary text-sm">
                            Profile viewed 5 times
                          </p>
                          <p className="font-secondary text-text-muted text-xs">
                            Today
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-surface-accent/50 rounded-lg">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-secondary text-text-primary text-sm">
                            Chemistry call completed
                          </p>
                          <p className="font-secondary text-text-muted text-xs">
                            Yesterday
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary">Booking Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-secondary text-text-secondary">Chemistry Calls</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-secondary font-semibold text-text-primary">28</span>
                            <div className="w-20 h-2 bg-surface-accent rounded-full">
                              <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-secondary text-text-secondary">Full Sessions</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-secondary font-semibold text-text-primary">15</span>
                            <div className="w-20 h-2 bg-surface-accent rounded-full">
                              <div className="w-1/2 h-2 bg-success rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-secondary text-text-secondary">Conversion Rate</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-secondary font-semibold text-text-primary">54%</span>
                            <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                              Good
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary">Peak Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">10:00 - 12:00</span>
                        <span className="font-secondary font-semibold text-text-primary">8 bookings</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">14:00 - 16:00</span>
                        <span className="font-secondary font-semibold text-text-primary">12 bookings</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">16:00 - 18:00</span>
                        <span className="font-secondary font-semibold text-text-primary">6 bookings</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Revenue Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">This Month</span>
                        <span className="font-primary text-xl font-bold text-text-primary">£2,840</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Last Month</span>
                        <span className="font-secondary font-semibold text-text-primary">£2,460</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Growth</span>
                        <div className="flex items-center space-x-1 text-success">
                          <ArrowUp className="w-4 h-4" />
                          <span className="font-secondary font-semibold">15.4%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary">Session Value</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Average per session</span>
                        <span className="font-secondary font-semibold text-text-primary">£74</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Highest value</span>
                        <span className="font-secondary font-semibold text-text-primary">£120</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Most common</span>
                        <span className="font-secondary font-semibold text-text-primary">£80</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="clients" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Client Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Active Clients</span>
                        <span className="font-secondary font-semibold text-text-primary">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">New This Month</span>
                        <span className="font-secondary font-semibold text-text-primary">4</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Retention Rate</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-secondary font-semibold text-text-primary">85%</span>
                          <Badge variant="secondary" className="bg-success text-success-foreground text-xs">
                            Excellent
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-primary">Client Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Average Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-secondary font-semibold text-text-primary">4.9</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Total Reviews</span>
                        <span className="font-secondary font-semibold text-text-primary">27</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-secondary text-text-secondary">Response Rate</span>
                        <span className="font-secondary font-semibold text-text-primary">92%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}